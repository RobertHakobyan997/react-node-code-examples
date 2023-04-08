import { ApiProperty } from '@nestjs/swagger';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';

export class HolidayCalendarsSortedRequest {
  @ApiProperty()
  field: string;

  @ApiProperty()
  sortOrder: string;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}

export class HolidayCalendarsResponse {
  @ApiProperty()
  page: number;

  @ApiProperty()
  pages: number;

  @ApiProperty()
  totalDocs: number;

  @ApiProperty({ description: 'List of holiday calendars', type: [ HolidayCalendars ] })
  docs: HolidayCalendars[];
}
