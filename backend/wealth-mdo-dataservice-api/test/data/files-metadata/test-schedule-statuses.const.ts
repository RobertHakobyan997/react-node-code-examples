import * as faker from 'faker';
import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

import { ScheduleStatuses } from '../../../src/components/files-metadata/types/schedule-status.interface';

export const testScheduleStatuses: ScheduleStatuses = {
  [ScheduleStatus.all]   : faker.datatype.number(),
  [ScheduleStatus.alert] : faker.datatype.number(),
  [ScheduleStatus.late]  : faker.datatype.number(),
  [ScheduleStatus.onTime]: faker.datatype.number(),
};
