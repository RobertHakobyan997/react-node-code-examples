import { DateTime } from 'luxon';

import { FileStatusCalculation } from '../../../src/components/files/types/file-status-calculation.interface';
import { scheduleTimeFormat } from '../../../src/core/utils/luxon';

export function getFileStatusCalculationBase(baseTime: DateTime): FileStatusCalculation {
  return {
    frequency: 'Daily',
    startDay : {
      day : baseTime.get('day'),
      time: baseTime.toFormat(scheduleTimeFormat)
    },
    endOfOnTime: {
      day : baseTime.get('day'),
      time: baseTime.plus({ hours: 1 }).toFormat(scheduleTimeFormat)
    },
    endOfLate: {
      day : baseTime.get('day'),
      time: baseTime.plus({ hours: 2 }).toFormat(scheduleTimeFormat)
    },
    received         : true,
    isBusinessDay    : false,
    holidayCalendarId: '609d488d3413c47110d7f91f'
  };
}

export function getFileStatusCalculationLateDaily(baseTime: DateTime): FileStatusCalculation {
  const fileStatusCalculationBase = getFileStatusCalculationBase(baseTime);
  return {
    ...fileStatusCalculationBase,
    endOfOnTime: {
      ...fileStatusCalculationBase.endOfOnTime,
      time: baseTime.minus({ hour: 1 }).toFormat(scheduleTimeFormat)
    },
    endOfLate: {
      ...fileStatusCalculationBase.endOfLate,
      time: baseTime.plus({ hour: 1 }).toFormat(scheduleTimeFormat)
    },
  };
}

export function getFileStatusCalculationLateMonthly(baseTime: DateTime): FileStatusCalculation {
  const fileStatusCalculationBase = getFileStatusCalculationBase(baseTime);
  return {
    ...fileStatusCalculationBase,
    startDay: {
      ...fileStatusCalculationBase.startDay,
      time: baseTime.plus({ hour: 1 }).toFormat(scheduleTimeFormat)
    },
    endOfOnTime: {
      ...fileStatusCalculationBase.endOfOnTime,
      day: baseTime.plus({ day: 1 }).get('day')
    }
  };
}

export function getFileStatusCalculationAlertDaily(baseTime: DateTime): FileStatusCalculation {
  const fileStatusCalculationBase = getFileStatusCalculationBase(baseTime);
  return {
    ...fileStatusCalculationBase,
    endOfOnTime: {
      ...fileStatusCalculationBase.endOfOnTime,
      time: baseTime.minus({ hour: 2 }).toFormat(scheduleTimeFormat)
    },
    endOfLate: {
      ...fileStatusCalculationBase.endOfLate,
      time: baseTime.minus({ hour: 1 }).toFormat(scheduleTimeFormat)
    },
    received: false
  };
}

export function getFileStatusCalculationAlertMonthly(baseTime: DateTime): FileStatusCalculation {
  const fileStatusCalculationBase = getFileStatusCalculationBase(baseTime);
  const fileStatusCalculationLateMonthly = getFileStatusCalculationLateMonthly(baseTime);

  return {
    ...fileStatusCalculationLateMonthly,
    endOfLate: {
      ...fileStatusCalculationBase.endOfOnTime,
      day: baseTime.plus({ day: 1 }).get('day')
    },
    received: false
  };
}
