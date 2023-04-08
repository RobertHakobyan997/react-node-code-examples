import { ApiProperty } from '@nestjs/swagger';

export class ScheduleHistoryDoc {
  @ApiProperty({
    description: 'date',
    example    : '2022-02-16'
  })
    date: string;

  @ApiProperty({
    description: 'fileReceived',
    example    : 'true'
  })
    fileReceived: string;

  @ApiProperty({
    description: 'fileStatus',
    example    : 'onTime'
  })
    fileStatus: string ;

  @ApiProperty({
    description: 'expectedDate',
    example    : '2022-02-16'
  })
    expectedDate: string ;
}

export class ScheduleHistoryResponse {
  @ApiProperty({
    description: 'docs',
    example    : [ {
      date        : '2022-02-16',
      fileReceived: 'true',
      fileStatus  : 'onTime',
      expectedDate: '2022-02-16'
    } ]
  })
    docs: ScheduleHistoryDoc[];

  @ApiProperty({
    description: 'totalDocs',
    example    : 10
  })
    totalDocs: number;
}
