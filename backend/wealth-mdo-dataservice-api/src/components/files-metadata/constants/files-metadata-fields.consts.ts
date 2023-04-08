export const ROOT_FIELDS = [ 'isEnabled', 'fileMask' ];

export const ROOT_ENUM_FIELDS = [ 'supplier', 'fileType', 'entityType', 'region', 'country' ];

export const AGGREGATION_ROOT_FIELDS = [ ...ROOT_FIELDS, 'received' ];

export const STATE_FIELDS = [
  'lastProcessTime',
  'lastPollTime',
  'scheduleStatus',
];

export const TIME_FIELDS = [
  'endOfOnSchedule',
  'endOfOnTime',
  'endOfLate',
];

export const CUSTOM_SORT_FIELDS = {
  DAY_OF_THE_WEEK: 'dayOfTheWeek',
};

export const IMPORT_KEYS_TO_OMIT = 'holidayCalendarId,contacts,state';
