import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiParam, PartialType } from '@nestjs/swagger';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import { Observable } from 'rxjs';

import {
  HolidayCalendarsResponse,
  HolidayCalendarsSortedRequest
} from '../../types/holiday-calendars.types';
import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';

import { HolidayCalendarsService } from './holiday-calendars.service';

export class PartialHolidayCalendars extends PartialType<HolidayCalendars>(HolidayCalendars) {
}

@ApiTags('Holiday Calendars')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.holidayCalendarsPage)
@Controller('holiday-calendars')
export class HolidayCalendarsController {
  constructor(private readonly service: HolidayCalendarsService) {}

  @ApiOperation({
    description: 'Create holiday calendars'
  })
  @ApiOkResponse({
    description: 'Return list of created holiday calendars',
    type : [ HolidayCalendars ]
  })
  @ApiBody({
    description: 'List of new calendars',
    type: [ HolidayCalendars ],
  })
  @PermissionsMeta(Permissions.createHolidayCalendar)
  @Post()
  createHolidayCalendars(@Body() body: HolidayCalendars[]): Observable<HolidayCalendars[]> {
    return this.service.createHolidayCalendars(body);
  }

  @ApiOperation({
    description: 'Get all calendars from Data Service API' })
  @ApiOkResponse({
    description: 'Return list of holiday calendars',
    type : HolidayCalendarsResponse
  })
  @Get()
  @PermissionsMeta(Permissions.viewHolidayCalendars)
  getHolidayCalendars() {
    return this.service.getHolidayCalendars();
  }

  @ApiOperation({
    description: 'Get sorted list of holiday calendars'
  })
  @ApiOkResponse({
    description: 'Return list of holiday calendars',
    type : [ HolidayCalendarsResponse ]
  })
  @ApiBody({
    description: 'Request parameters',
    type: HolidayCalendarsSortedRequest,
  })
  @Post('sorted')
  getSortedHolidayCalendars(@Body() body: HolidayCalendarsSortedRequest): Observable<HolidayCalendarsResponse> {
    return this.service.getSortedHolidayCalendars(body);
  }

  @ApiOperation({
    description: 'Update holiday calendar',
  })
  @ApiOkResponse({
    description: 'Return updated calendar',
    type : HolidayCalendars
  })
  @ApiBody({
    description: 'Properties to update',
    type: PartialHolidayCalendars,
  })
  @ApiParam({ name: 'id', type: String, example: '62136455dfe96a8d2c92414a' })
  @Put(':id')
  @PermissionsMeta(Permissions.editHolidayCalendar)
  updateHolidayCalendar(
    @Param('id') id: string,
    @Body() body: PartialHolidayCalendars,
  ) {
    return this.service.updateHolidayCalendar(id, body);
  }

  @ApiOperation({
    description: 'Delete holiday calendar',
  })
  @ApiOkResponse({
    description: 'Return deleted calendar',
    type : HolidayCalendars
  })
  @ApiParam({ name: 'id', type: String, example: '62136455dfe96a8d2c92414a' })
  @Delete(':id')
  @PermissionsMeta(Permissions.deleteHolidayCalendar)
  deleteHolidayCalendar(@Param('id') id: string) {
    return this.service.deleteHolidayCalendar(id);
  }

  @ApiOperation({ description: 'Toggle holiday calendar' })
  @ApiParam({ name: 'id', type: String, example: '62136455dfe96a8d2c92414a' })
  @ApiBody({
    description: 'Holiday calendar with inverted isEnabled value',
    type: PartialHolidayCalendars,
  })
  @ApiOkResponse({
    description: 'Return deleted calendar',
    type : HolidayCalendars
  })
  @Put('toggle-holiday-calendar-disable/:id')
  @PermissionsMeta(Permissions.enableOrDisableHolidayCalendar)
  activateHolidayCalendar(
    @Param('id') id: string,
    @Body() body: PartialHolidayCalendars,
  ) {
    return this.service.toggleHolidayCalendarDisable(id, body);
  }

  @ApiOperation({
    description: 'Update holiday calendar contacts',
  })
  @ApiParam({ name: 'id', type: String, example: '62136455dfe96a8d2c92414a' })
  @ApiBody({
    description: 'Holiday calendar with inverted isEnabled value',
    type: [ String ],
  })
  @ApiOkResponse({
    description: 'Returns updated holiday calendar',
    type : HolidayCalendars
  })
  @Patch(':id/contacts')
  @PermissionsMeta(Permissions.editContacts)
  async updateContacts(
    @Param('id') id: string,
    @Body() emails: string[]
    ) {
    return this.service.updateContacts(id, emails);
  }
}
