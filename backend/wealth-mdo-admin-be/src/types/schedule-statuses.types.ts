import { ApiProperty } from '@nestjs/swagger';
import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export interface ScheduleStatuses {
  [ScheduleStatus.all]: number;
  [ScheduleStatus.alert]: number;
  [ScheduleStatus.late]: number;
  [ScheduleStatus.onTime]: number;
}

export class ScheduleStatusesDto implements ScheduleStatuses {
  @ApiProperty({
    description: 'Total schedule statuses count',
 })
  [ScheduleStatus.all]: number;
  @ApiProperty({
    description: 'Alert schedule statuses count',
 })
  [ScheduleStatus.alert]: number;
  @ApiProperty({
    description: 'Late schedule statuses count',
 })
  [ScheduleStatus.late]: number;
  @ApiProperty({
    description: 'OnTime schedule statuses count',
 })
  [ScheduleStatus.onTime]: number;
}
