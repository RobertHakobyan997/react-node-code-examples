import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsOptional } from 'class-validator';
import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export class ScheduleHistoryRequest {
  @Allow()
  @ApiProperty({
    description: 'File Metadata ID',
    example    : '620d43c901c7e41a00e2046a'
  })
    fileMetadataId: string;

  @Allow()
  @ApiProperty({
    description: 'field',
    example    : 'channel'
  })
    field: string;

  @Allow()
  @ApiProperty({
    description: 'sortOrder',
    example    : 'asc'
  })
    sortOrder: string;

  @Allow()
  @ApiProperty({
    description: 'limit',
    example    : 10
  })
    limit: number;

  @Allow()
  @ApiProperty({
    description: 'offset',
    example    : 5
  })
    offset: number;

  @Allow()
  @ApiProperty({
    description: 'statuses',
    example    : [ 'alertSent', 'late' ]
  })
    statuses: ScheduleStatus[];

  @Allow()
  @ApiProperty({
    description: 'timeZone',
    example    : 'GMT+4'
  })
    timeZone: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'fromDate',
    example    : '2022-02-16'
  })
    fromDate: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'toDate',
    example    : '2022-03-21'
  })
    toDate: string;
}
