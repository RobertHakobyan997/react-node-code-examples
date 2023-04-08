import { readFile } from 'fs';
import { resolve as pathResolve } from 'path';
import { DateTime } from 'luxon';
import { LeanDocument } from 'mongoose';
import { chain, flatMap, head, isEmpty, isEqual, omit, set, size, uniqBy } from 'lodash';
import { EventChannel, EventSource, EventTopic, Frequency, ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { ActiveSchedule, ActiveScheduleTime } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';
import { from, MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, map, switchMap, toArray } from 'rxjs/operators';
import ScheduleTime from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-time';
import Schedule from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule';
import HolidayCalendarDate from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendar-date';
import ScheduleDay from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/schedule-day';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import Events from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/events';
import { ObjectId } from 'mongodb';

import {
  getTimeZoneArrivalPeriod,
  getBusinessDate,
  getBusinessDay,
  getCalendarDay,
  getHolidayDates,
  getHolidaysWithWeekends,
  getIsoHolidayDates,
  getWeekCalendarDate,
  getWeeklyCalendarDate,
  getWorkCalendarDate,
  getWorkDay,
  getYearHolidays,
} from '../../holiday-calendars/pure/holiday-calendars.pure';
import { AGGREGATION_ROOT_FIELDS, ROOT_ENUM_FIELDS, STATE_FIELDS, TIME_FIELDS } from '../constants/files-metadata-fields.consts';
import { ScheduleDaysOfTheWeek } from '../enums/schedule-day-of-the-week.enum';
import { OrderDirection } from '../enums/order-direction.enum';
import { Periods } from '../enums/periods';
import { getLastProcessedFiles } from '../../files/pure/files.pure';
import {
  allDaysOfWeek,
  fromFormat,
  getPossibleWeekdays,
  getShiftedPeriod,
  isNowInPeriod,
  now,
  scheduleTimeFormat,
  shiftedNow,
  todayIsNotHoliday,
  toUtcTime,
  utcZone
} from '../../../core/utils/luxon';
import { isMonthlyMetadata, isNonDailyMetadata } from '../../../core/utils/types';

export const scheduleTimeAsUtc = (scheduleTime: ScheduleTime | ActiveScheduleTime, timeZone: string) => ({
  ...scheduleTime,
  time: toUtcTime(scheduleTime.time, scheduleTimeFormat, timeZone),
});

function getPeriod(frequency: Frequency) {
  return frequency === Frequency.Weekly
    ? Periods.Week
    : Periods.Month;
}

export const todayIsInSchedule = (schedule: Schedule) => {
  const supportedSchedules = Object.values(Frequency);

  return supportedSchedules.includes(schedule.frequency) && schedule.expectedDays
    .map(({ dayOfTheWeek }) => ({ day: dayOfTheWeek, zone: schedule.timeZone }))
    .some(({ day, zone }) => getPossibleWeekdays(zone).includes(day));
};

export const getUtcCalendarDate = (
  isBusinessDay: boolean,
  startDay: number,
  dayOfTheWeek: string,
  holidays: HolidayCalendarDate[],
  startTime: string,
  timeZone: string,
  periodDate: DateTime,
  isEndOfSchedule = false,
  frequency?: Frequency
) => {
  if (isBusinessDay) {
    return getBusinessDate(holidays, startDay, startTime, timeZone, periodDate);
  }
  switch (dayOfTheWeek) {
  case ScheduleDaysOfTheWeek.AllWorkDays:
    return getWorkCalendarDate(holidays, startDay, startTime, timeZone, periodDate, isEndOfSchedule, frequency);
  case ScheduleDaysOfTheWeek.AllDaysOfWeek:
    return getWeekCalendarDate(holidays, startDay, startTime, timeZone, periodDate);
  default:
    return getWeeklyCalendarDate(dayOfTheWeek, startTime, timeZone, periodDate);
  }
};

function getPeriodShift(startDate: DateTime, startDay: number, scheduleDay: number, timeZone: string, isEndOfOnSchedule: boolean) {
  const shiftBack = shiftedNow(timeZone) < startDate ? -1 : 0;
  const shiftForward = !isEndOfOnSchedule && startDay >= scheduleDay ? 1 : 0;
  return shiftBack + shiftForward;
}

export const convertScheduleDayToDateTime = (
  { isBusinessDay, startDay, dayOfTheWeek }: Partial<ScheduleDay>,
  frequency: Frequency,
  timeZone: string,
  scheduleTime: ScheduleTime,
  holidays: HolidayCalendarDate[],
  calendarStartDate: DateTime,
  isEndOfSchedule = false,
) => {
  const periodShift = frequency !== Frequency.Daily && frequency !== Frequency.AdHoc
    ? getPeriodShift(calendarStartDate, startDay, scheduleTime.day, timeZone, isEndOfSchedule)
    : 0;
  const currentDateTime = getShiftedPeriod(shiftedNow(timeZone), getPeriod(frequency), periodShift);
  return getUtcCalendarDate(
    isBusinessDay,
    scheduleTime.day || currentDateTime.day,
    dayOfTheWeek,
    holidays,
    scheduleTime.time,
    timeZone,
    currentDateTime,
    isEndOfSchedule,
    frequency
  );
};

export function getScheduleDates(scheduleDay: ScheduleDay, holidays: HolidayCalendarDate[], frequency: Frequency, timeZone: string) {
  const { isBusinessDay, startDay, startTime, dayOfTheWeek, endOfOnSchedule, endOfOnTime, endOfLate } = scheduleDay;
  const currentDateTime = shiftedNow(timeZone);
  const calendarStartDate = getUtcCalendarDate(
    isBusinessDay,
    startDay || currentDateTime.day,
    dayOfTheWeek,
    holidays,
    startTime,
    timeZone,
    currentDateTime,
  );
  const endOfOnScheduleDate = endOfOnSchedule ?
    convertScheduleDayToDateTime(
      scheduleDay,
      frequency,
      timeZone,
      endOfOnSchedule,
      holidays,
      calendarStartDate,
      true
    )
    : null;
  const endOfOnTimeDate = endOfOnTime ?
    convertScheduleDayToDateTime(
      scheduleDay,
      frequency,
      timeZone,
      endOfOnTime,
      holidays,
      calendarStartDate
    )
    : null;
  const endOfLateDate = endOfLate ?
    convertScheduleDayToDateTime(
      scheduleDay,
      frequency,
      timeZone,
      endOfLate,
      holidays,
      calendarStartDate
    )
    : null;
  return {
    startDateTime: convertScheduleDayToDateTime(
      scheduleDay,
      frequency,
      timeZone,
      { day: startDay || currentDateTime.day, time: startTime },
      holidays,
      calendarStartDate,
      true
    ),
    endOfOnScheduleDate,
    endOfOnTimeDate,
    endOfLateDate,
    calendarStartDate
  };
}

export const convertExpectedDays = ({ schedule, ...metadata }: { holidays: HolidayCalendarDate[] } & FilesMetadata): FilesMetadata => ({
  ...metadata,
  schedule: {
    ...schedule,
    expectedDays: schedule.expectedDays
      .map(scheduleDay => {
        const convertedStartTime = fromFormat(scheduleDay.startTime, scheduleTimeFormat, schedule.timeZone);
        const convertedEndTime = fromFormat(scheduleDay.endTime, scheduleTimeFormat, schedule.timeZone);
        const {
          startDateTime,
          calendarStartDate,
          endOfLateDate,
          endOfOnScheduleDate,
          endOfOnTimeDate
        } = getScheduleDates(scheduleDay, metadata.holidays, schedule.frequency, schedule.timeZone);
        return {
          ...scheduleDay,
          calendarStartDate,
          startDateTime,
          endOfOnScheduleDateTime: endOfOnScheduleDate,
          endOfOnTimeDateTime    : endOfOnTimeDate,
          endOfLateDateTime      : endOfLateDate,
          startTime              : convertedStartTime,
          endTime                : convertedEndTime && convertedEndTime < convertedStartTime
            ? convertedEndTime.plus({ days: 1 })
            : convertedEndTime,
        } as any;
      }),
  },
});

export const isMonthlyInSchedule = (scheduleDay: { calendarStartDate: DateTime } & ScheduleDay) =>
  now() >= scheduleDay.calendarStartDate && isNowInPeriod(scheduleDay);

export const nonWorkingDays = ({ schedule }: FilesMetadata, listOfHolidays: HolidayCalendarDate[], startDate: DateTime) =>
  schedule.expectedDays.some(({ dayOfTheWeek }) => dayOfTheWeek === allDaysOfWeek)
    ? getIsoHolidayDates(listOfHolidays)
    : getHolidaysWithWeekends(true, listOfHolidays, startDate).map(pair => pair.holidayDate);

export const filterSchedule = ({ schedule }: FilesMetadata): boolean => {
  const isInSchedule = isMonthlyMetadata(schedule.frequency) ? isMonthlyInSchedule : isNowInPeriod;
  return schedule.expectedDays.some(isInSchedule);
};

export const scheduleTimeToString = ({ schedule, ...metadata }: FilesMetadata): FilesMetadata => ({
  ...metadata,
  schedule: {
    ...schedule,
    expectedDays: schedule.expectedDays
      .filter(({ dayOfTheWeek }) => getPossibleWeekdays(schedule.timeZone).includes(dayOfTheWeek))
      .filter(isNowInPeriod)
      .map(({ startTime, endTime, ...scheduleDay }) => ({
        ...scheduleDay,
        startTime: (startTime as unknown as DateTime).toFormat(scheduleTimeFormat),
        endTime  : (endTime as unknown as DateTime)?.toFormat(scheduleTimeFormat),
      })),
  },
});

export function sortBy(field: string) {
  if (AGGREGATION_ROOT_FIELDS.includes(field)) {
    return field;
  }
  if (ROOT_ENUM_FIELDS.includes(field)) {
    return `${field}.display`;
  }
  if (STATE_FIELDS.includes(field)) {
    return `state.${field}`;
  }
  return TIME_FIELDS.includes(field)
    ? `scheduleDisplay.${field}.date`
    : `scheduleDisplay.${field}`;
}

export const getTodayAndPriorDays = () => new Array(7)
  .fill(null)
  .map((_, i) => now().minus({ days: i }).weekdayLong);

export function sortByDayOfTheWeek(metadata: FilesMetadata[], order: string) {
  const getFirstDayOfTheWeek = ({ schedule }: FilesMetadata) => head(schedule.expectedDays).dayOfTheWeek;
  const isAllDaysSchedule = (fm: FilesMetadata) => getFirstDayOfTheWeek(fm) === ScheduleDaysOfTheWeek.AllDaysOfWeek
    || getFirstDayOfTheWeek(fm) === ScheduleDaysOfTheWeek.AllWorkDays;
  const allDaysOrWorkDays = chain(metadata).filter(item => isAllDaysSchedule(item));
  const specificDays = chain(metadata).filter(item => !isAllDaysSchedule(item));

  const sortedAllDays = allDaysOrWorkDays
    .orderBy(item => getFirstDayOfTheWeek(item) === ScheduleDaysOfTheWeek.AllDaysOfWeek, order as OrderDirection)
    .value();
  const sortedSpecificDays = specificDays
    .orderBy(item => item.schedule.expectedDays.length, order as OrderDirection)
    .value();

  return order === OrderDirection.Descending
    ? [ ...sortedAllDays, ...sortedSpecificDays ]
    : [ ...sortedSpecificDays, ...sortedAllDays ];
}

export function mapScheduleToUtc(metadata: Array<FilesMetadata & { scheduleDisplay?: ActiveSchedule }>) {
  return chain(metadata)
    .map(({ scheduleDisplay, ...item }) => {
      if (!scheduleDisplay) return item as FilesMetadata;

      // Here we can use .virtual from schemas
      set(scheduleDisplay, 'endOfLate', scheduleTimeAsUtc(scheduleDisplay.endOfLate, scheduleDisplay.timeZone));
      set(scheduleDisplay, 'endOfOnSchedule', scheduleTimeAsUtc(scheduleDisplay.endOfOnSchedule, scheduleDisplay.timeZone));
      set(scheduleDisplay, 'endOfOnTime', scheduleTimeAsUtc(scheduleDisplay.endOfOnTime, scheduleDisplay.timeZone));
      set(scheduleDisplay, 'startTime', toUtcTime(scheduleDisplay.startTime, scheduleTimeFormat, scheduleDisplay.timeZone));
      set(scheduleDisplay, 'endTime', toUtcTime(scheduleDisplay.endTime, scheduleTimeFormat, scheduleDisplay.timeZone));
      set(scheduleDisplay, 'timeZone', utcZone);
      return { ...item, scheduleDisplay } as FilesMetadata & { scheduleDisplay?: ActiveSchedule };
    })
    .value();
}

export const mapDisplayKeys = (array: Enum[], key: string) => chain(array)
  .find([ 'key', key ])
  .get('display', key)
  .value();

export const mapStaticDataKeys = (array: Enum[], key: string) => chain(array)
  .find([ 'key', key ])
  .value() || { key, display: key } as Enum;

export const filterWeekdaysBySchedule = ({ dayOfTheWeek, timeZone }: ActiveSchedule) => getPossibleWeekdays(timeZone)
  .filter(item => isEqual(item, dayOfTheWeek));

export function isReceived(lastFileUploadedTime: Date, scheduleDisplay: ActiveSchedule, calendar: HolidayCalendarDate[]) {
  const receivedSize = size(filterWeekdaysBySchedule(scheduleDisplay) ? scheduleDisplay : null);

  if (receivedSize <= 0 || !lastFileUploadedTime) {
    return false;
  }

  const lastFileUploadedDateTime = DateTime.fromISO(lastFileUploadedTime.toISOString());
  if (isNonDailyMetadata(scheduleDisplay.frequency)) {
    const { isBusinessDay, startDay, dayOfTheWeek, timeZone, startTime } = scheduleDisplay;
    const currentMonthStartDay = getUtcCalendarDate(isBusinessDay, startDay, dayOfTheWeek, calendar, startTime, timeZone, now());
    return now() < currentMonthStartDay // current period started last month
      ? lastFileUploadedDateTime >= currentMonthStartDay.minus({ month: 1 }) && lastFileUploadedDateTime < currentMonthStartDay
      : lastFileUploadedDateTime >= currentMonthStartDay && lastFileUploadedDateTime <= now();
  }
  return lastFileUploadedDateTime > now().startOf('day') && lastFileUploadedDateTime < now().endOf('day');
}

export const filterScheduleByDay = (expectedDays: ScheduleDay[], day: string) => expectedDays
  .filter(item => item.dayOfTheWeek === day ? item : null);

export const filterDaysBySchedule = (schedule: ScheduleDay[]) => getTodayAndPriorDays()
  .filter(day => !isEmpty(filterScheduleByDay(schedule, day)));

export const filterFilteredScheduleByDay = (schedule: ScheduleDay[]) => schedule
  .filter(item => head(filterDaysBySchedule(schedule)) === item.dayOfTheWeek);

function getStartDate(utcCalendarDate: DateTime) {
  return utcCalendarDate >= now().startOf('month')
    ? utcCalendarDate
    : now().startOf('month');
}

function getExpectedDateForReceived(holidays: HolidayCalendarDate[], schedule: ActiveSchedule) {
  const { endOfOnSchedule, isBusinessDay, startDay, startTime, timeZone, dayOfTheWeek } = schedule;
  const { day } = endOfOnSchedule;
  const utcCalendarDate = getUtcCalendarDate(isBusinessDay, startDay, dayOfTheWeek, holidays, startTime, timeZone, now());
  const startDate = getStartDate(utcCalendarDate);
  const arrivalPeriod = getTimeZoneArrivalPeriod(schedule, timeZone, holidays, startDate);

  return isBusinessDay
    ? getBusinessDay(holidays, day, arrivalPeriod, timeZone, true)
    : getCalendarDay(holidays, day, dayOfTheWeek, arrivalPeriod, timeZone, true);
}

export function getNextFileExpectedDate(
  isFileReceived: boolean,
  frequency: Frequency,
  timeZone: string,
  schedule: ActiveSchedule,
  calendar: HolidayCalendarDate[],
  expectedDays: ScheduleDay[],
) {
  switch (frequency) {
  case Frequency.Daily:
    return DateTime.local(1000);
  case Frequency.Weekly:
    return getWorkDay(calendar, expectedDays);
  case Frequency.Monthly:
  case Frequency.ContinuousMonthly: {
    if (isFileReceived) {
      return getExpectedDateForReceived(calendar, schedule);
    }
    const { isBusinessDay, startDay, startTime, endOfOnSchedule, dayOfTheWeek } = schedule;
    const { day } = endOfOnSchedule;
    const startDate = getUtcCalendarDate(isBusinessDay, startDay, dayOfTheWeek, calendar, startTime, timeZone, now());
    const arrivalPeriod = getTimeZoneArrivalPeriod(schedule, timeZone, calendar, startDate);
    return isBusinessDay
      ? getBusinessDay(calendar, day, arrivalPeriod, timeZone)
      : getCalendarDay(calendar, day, dayOfTheWeek, arrivalPeriod, timeZone);
  }
  default:
    return DateTime.local(1000);
  }
}

export const getListOfHolidays = (calendars: HolidayCalendars[], id: ObjectId) => flatMap(
  calendars.filter(({ _id }) => isEqual(id, _id)),
  ({ listOfHolidays }) => getYearHolidays(listOfHolidays)
);

export const getScheduleDisplay = ({ schedule }: LeanDocument<FilesMetadata>, calendar: HolidayCalendarDate[]) => {
  const { expectedDays, frequency, timeZone } = schedule;
  const activeSchedule = size(expectedDays) === 1
    ? head(expectedDays)
    : head(filterFilteredScheduleByDay(expectedDays));
  const scheduleDates = getScheduleDates(activeSchedule, calendar, frequency, timeZone);
  return {
    // eslint-disable-next-line max-len
    frequency      : frequency.replace(Frequency.ContinuousMonthly, Frequency.Monthly), // for sorting (since we replace ContinuousMonthly with Monthly on UI)
    isBusinessDay  : activeSchedule.isBusinessDay,
    startDay       : activeSchedule.startDay,
    endDay         : activeSchedule.endDay,
    dayOfTheWeek   : activeSchedule.dayOfTheWeek,
    startTime      : activeSchedule.startTime,
    endTime        : activeSchedule.endTime,
    endOfOnSchedule: { ...activeSchedule.endOfOnSchedule, date: scheduleDates.endOfOnScheduleDate } as ActiveScheduleTime,
    endOfOnTime    : { ...activeSchedule.endOfOnTime, date: scheduleDates.endOfOnTimeDate } as ActiveScheduleTime,
    endOfLate      : { ...activeSchedule.endOfLate, date: scheduleDates.endOfLateDate } as ActiveScheduleTime,
    timeZone,
  } as ActiveSchedule;
};

export function getScheduleTableFields(metadata: FilesMetadata[], holidays: HolidayCalendars[]) {
  return metadata.map(doc => {
    const { state, schedule } = doc;
    const calendar = holidays
      .find(holiday => holiday._id.toString() === doc.holidayCalendarId.toString())
      .listOfHolidays;
    const holidayDays = getYearHolidays(calendar);
    const scheduleDisplay = getScheduleDisplay(doc, holidayDays);
    const received = isReceived(state.lastFileUploadedTime, scheduleDisplay, holidayDays);
    const nextFileExpectedOn = getNextFileExpectedDate(
      received,
      scheduleDisplay.frequency,
      scheduleDisplay.timeZone,
      scheduleDisplay,
      holidayDays,
      schedule.expectedDays);
    set(doc, 'scheduleDisplay', scheduleDisplay);
    set(doc, 'scheduleDisplay.nextFileExpectedOn', nextFileExpectedOn);
    set(doc, 'received', received ? 'Yes' : 'No');
    set(doc, 'state.lastPollTime', !received ? state.lastPollTime : '');

    return doc as FilesMetadata & { scheduleDisplay?: ActiveSchedule };
  });
}

export function replaceKeys(
  doc: FilesMetadata,
  [ suppliers, fileTypes, entityTypes, regions, countries, processingStatuses, scheduleStatuses ]: Enum[][],
) {
  doc.state.processingStatus = mapDisplayKeys(processingStatuses, doc.state.processingStatus);
  doc.state.scheduleStatus = mapDisplayKeys(scheduleStatuses, doc.state.scheduleStatus) as ScheduleStatus;
  return {
    ...doc,
    supplier  : mapStaticDataKeys(suppliers, doc.supplier),
    entityType: mapStaticDataKeys(entityTypes, doc.entityType),
    region    : mapStaticDataKeys(regions, doc.region),
    country   : mapStaticDataKeys(countries, doc.country),
    fileType  : mapStaticDataKeys(fileTypes, doc.fileType)
  } as FilesMetadata<Enum>;
}

export function metadataMapper(docs: Array<FilesMetadata & { scheduleDisplay?: ActiveSchedule }>, staticData: Enum[][]) {
  const keys = [
    'ftpPath',
    'ftpAccountName',
    'ftpOutputPath',
    'workflowProcessName',
    'workflowProcessKey',
    'notification',
    'validations',
    'fieldLocations',
    'eagleIdentifiers',
    'fxRatesCalculation',
    'snaplogicTasks',
    'state.errorMessage',
    'id',
  ];
  return docs
    .map(doc => replaceKeys(doc, staticData))
    .map(doc => omit(doc, keys));
}

export const joinMetadataWithLatestProcessedFile = (metadata: FilesMetadata[], lastProcessedFiles: Files[]) =>
  metadata.map(doc => {
    const latestProcessedFile = lastProcessedFiles.find(file => file.filesMetadataId.toString() === doc._id.toString())?.sourceFileData;
    return {
      ...doc,
      state: {
        ...doc.state,
        previousFileNumberOfRecords: latestProcessedFile?.filteredNumberOfRecords ?? null,
        previousFileName           : latestProcessedFile?.fileName ?? '',
      },
    };
  });

export function getNumberOfRecordsWithHolidays(): MonoTypeOperatorFunction<any> {
  // ToDo: rework with full rx power
  return pipe(
    map(([ metadata, files, suppliers, calendars ]) => {
      const joinedData = joinMetadataWithLatestProcessedFile(metadata, getLastProcessedFiles(files));
      return ([ metadata, files, suppliers, calendars, uniqBy(joinedData, ({ _id }) => _id.toString()) ]);
    })
  );
}

export function getHolidays(): MonoTypeOperatorFunction<any> {
  // ToDo: rework with full rx power
  return pipe(
    map(([ metadata, files, suppliers, calendars, records ]) => {
      const data = records.map(doc => ({
        ...doc,
        holidays: getListOfHolidays(calendars, doc.holidayCalendarId),
        timeZone: doc.schedule?.timeZone ?? utcZone,
      }));
      return [ metadata, files, suppliers, calendars, uniqBy(data, ({ _id }) => _id.toString()) ];
    }),
  );
}

export function getSuppliersSource(): MonoTypeOperatorFunction<any> {
  // ToDo: rework with full rx power
  return pipe(
    map(([ _metadata, _files, suppliers, _calendars, recordsWithHolidays ]) => {
      const data = recordsWithHolidays.map(doc => ({
        ...doc,
        source: suppliers.filter(({ key }) => isEqual(doc.supplier, key)).map(({ source }) => source),
      }));
      return uniqBy(data, ({ _id }) => _id.toString());
    }),
    switchMap(data => from(data)),
  );
}

export function getRecordWithSuppliers(): MonoTypeOperatorFunction<any> {
  return pipe(
    getNumberOfRecordsWithHolidays(),
    getHolidays(),
    getSuppliersSource(),
    filter(({ schedule, holidays, timeZone }) => todayIsInSchedule(schedule) && todayIsNotHoliday(getHolidayDates(holidays), timeZone)),
    map(convertExpectedDays),
    filter(filterSchedule),
    map(scheduleTimeToString),
    filter(({ schedule }) => !!schedule.expectedDays.length),
    toArray(),
  );
}

export const filterMetadata = (
  metadata: Array<Partial<FilesMetadata & { scheduleDisplay?: ActiveSchedule }>>,
  received: string,
) => received ? metadata.filter(doc => doc['received'] === received) : metadata;

export const getScheduleEvent = () => ({
  channel: EventChannel.FilesMetadataSchedule,
  topic  : EventTopic.InSchedule,
  source : EventSource.DSAPI,
  user   : {},
  data   : {},
} as Events);

export function getReferenceMetadata() {
  const path = pathResolve(process.cwd(), process.env.DAM_DB_FILES_DIR_PATH, 'files-metadata.json');
  return new Promise<FilesMetadata[]>((resolve, reject) => readFile(path, (err, content) => {
    if (err) reject(err);
    try {
      resolve(JSON.parse(content.toString()));
    } catch (exception) {
      reject(exception);
    }
  }));
}

// TODO: find a way to fix order automaticall or be sure that we keep this method in syc with the schema
export const reorderMetadata = (metadatas: FilesMetadata[]) => metadatas.map(metadata => ({
  _id                  : metadata._id,
  /* Core Properties */
  isEnabled            : metadata.isEnabled,
  isMaster             : metadata.isMaster,
  supplier             : metadata.supplier,
  fileType             : metadata.fileType,
  entityType           : metadata.entityType,
  region               : metadata.region,
  country              : metadata.country,
  fileMask             : metadata.fileMask,
  fileFormat           : metadata.fileFormat,
  ftpPath              : metadata.ftpPath,
  ftpAccountName       : metadata.ftpAccountName,
  ftpOutputPath        : metadata.ftpOutputPath,
  workflowProcessName  : metadata.workflowProcessName,
  workflowProcessKey   : metadata.workflowProcessKey,
  fileProcessingActions: metadata.fileProcessingActions,
  dependencies         : metadata.dependencies ?? [],
  /* Schedule properties */
  holidayCalendarId    : metadata.holidayCalendarId,
  schedule             : metadata.schedule,
  /* Camunda properties */
  snaplogicTasks       : metadata.snaplogicTasks,
  notification         : metadata.notification,
  /* Snaplogic properties */
  dataValidationType   : metadata.dataValidationType,
  source               : metadata.source,
  valuationDate        : metadata.valuationDate,
  eagleIdentifiers     : metadata.eagleIdentifiers,
  fxRatesCalculation   : metadata.fxRatesCalculation,
  fileProcessIndicators: metadata.fileProcessIndicators,
  fieldLocations       : metadata.fieldLocations,
  /* Changeable Snaplogic properties */
  validations          : metadata.validations ?? [],
  /* Changeable properties */
  contacts             : metadata.contacts ?? [],
  state                : metadata.state,
  createdAt            : metadata.createdAt ?? now().toISO(),
  updatedAt            : metadata.updatedAt ?? now().toISO(),
  __v                  : metadata.__v ?? 0
}));
