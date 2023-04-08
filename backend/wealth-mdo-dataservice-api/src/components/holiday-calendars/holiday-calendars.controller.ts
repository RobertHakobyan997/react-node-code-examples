import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  PartialType as SwaggerPartialType
} from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import { NonNullable } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/mongoose.decorator';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import { PartialType } from '@nestjs/mapped-types';

import { HolidayCalendarsService } from './holiday-calendars.service';
import { HolidayCalendarsFilter } from './types/holiday-calendars-filter.interface';
import { HolidayCalendarsWeekends } from './types/holiday-calendars-weekends.interface';

export class PartialHolidayCalendars extends PartialType<HolidayCalendars>(
  HolidayCalendars
) {}

@ApiTags('Holiday Calendars')
@Controller('holiday-calendars')
export class HolidayCalendarsController {
  constructor(private readonly service: HolidayCalendarsService) {}

  @ApiOperation({
    description: 'Get all holiday calendars',
  })
  @ApiOkResponse({
    description: 'Returns all holiday calendars',
    type       : [ HolidayCalendars ],
  })
  @Get()
  @Log('Get all holiday calendars')
  getAll() {
    return this.service.getAll();
  }

  @ApiOperation({
    description: 'Get weekends with holidays for this year',
  })
  @ApiOkResponse({
    description: 'Returns weekends with holidays for this year',
    type       : [ HolidayCalendarsWeekends ],
  })
  // TODO: rename 'weekends' to 'holidays-with-weekends'
  @Get('weekends')
  @Log('Get weekends with holidays for this year')
  getHolidaysWithWeekends() {
    return this.service.getHolidaysWithWeekends();
  }

  @ApiOperation({
    description: 'Get expiring holiday calendars'
  })
  @ApiOkResponse({
    description: 'Expiring holiday calendars',
    type       : [ HolidayCalendars ]
  })
  @Get('expiring')
  @Log('Get expiring holiday calendars')
  getExpiringHolidayCalendars() {
    return this.service.getExpiringHolidayCalendars();
  }

  @ApiOperation({
    description: 'Get holiday calendar by id',
  })
  @ApiParam({
    name       : 'id',
    description: 'holiday calendar id',
    example    : '609d488d3413c47110d7f91f',
  })
  @ApiOkResponse({
    description: 'Returns holiday calendar by id',
    type       : HolidayCalendars,
  })
  @Get(':id')
  @NonNullable()
  @Log('Get holiday calendar by id')
  getHolidayCalendar(@Param('id') id: string) {
    return this.service.getHolidayCalendar(id);
  }

  @ApiOperation({
    description: 'Get sorted list of holiday calendars',
  })
  @ApiBody({
    description: 'Holiday calendars filter',
    type       : [ HolidayCalendarsFilter ],
  })
  @ApiOkResponse({
    description: 'Returns sorted list of holiday calendars',
    type       : [ HolidayCalendars ],
  })
  @Post('sorted')
  @Log('Get sorted list of holiday calendars')
  getSortedHolidayCalendars(@Body() body: HolidayCalendarsFilter) {
    return this.service.getSortedHolidayCalendars(body);
  }

  @ApiOperation({
    description: 'Create new holiday calendar',
  })
  @ApiBody({
    description: 'Holiday calendars schema',
    type       : HolidayCalendars,
  })
  @ApiCreatedResponse({
    description: 'Returns created holiday calendar',
    type       : [ HolidayCalendars ],
  })
  @Post()
  @Log('Add new holiday calendar')
  create(@Body() calendars: HolidayCalendars[]) {
    return this.service.create(calendars);
  }

  @ApiOperation({
    description: 'Update holiday calendar',
  })
  @ApiBody({
    description: 'Holiday calendars schema',
    type       : SwaggerPartialType<HolidayCalendars>(HolidayCalendars),
  })
  @ApiParam({
    name       : 'id',
    description: 'holiday calendar id',
    example    : '609d488d3413c47110d7f91f',
  })
  @ApiOkResponse({
    description: 'Returns updated holiday calendar',
    type       : HolidayCalendars,
  })
  @Put(':id')
  @Log('Update holiday calendar')
  update(@Param('id') id: string, @Body() calendar: PartialHolidayCalendars) {
    return this.service.update(id, calendar);
  }

  @ApiOperation({
    description: 'Update holiday calendar contacts',
  })
  @ApiParam({
    name       : 'id',
    description: 'holiday calendar id',
    example    : '609d488d3413c47110d7f91f',
  })
  @ApiBody({
    description: 'Holiday calendars contacts',
    type       : [ String ],
  })
  @ApiOkResponse({
    description: 'Returns updated holiday calendar',
    type       : HolidayCalendars,
  })
  @Patch(':id/contacts')
  @Log('Update holiday calendar contacts')
  updateContacts(
    @Param('id') id: string,
    @Body() emails: string[],
  ) {
    return this.service.updateContacts(id, emails);
  }

  @ApiOperation({
    description: 'Delete holiday calendar',
  })
  @ApiParam({
    name       : 'id',
    description: 'Holiday calendar id',
    example    : '611f68a99f217cce3a4d91f8',
  })
  @ApiOkResponse({
    description: 'Returns deleted holiday calendar',
    type       : HolidayCalendars
  })
  @Delete(':id')
  @Log('Delete holiday calendar')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
