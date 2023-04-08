import { ApiProperty } from '@nestjs/swagger';

export class HolidayCalendarsWeekends {
  @ApiProperty({
    description: 'holidayName',
    example    : 'New Years Day',
    type       : String
  })
    holidayName: string;

  @ApiProperty({
    description: 'holidayDate',
    example    : '2022-01-03',
    type       : String
  })
    holidayDate: string;
}
