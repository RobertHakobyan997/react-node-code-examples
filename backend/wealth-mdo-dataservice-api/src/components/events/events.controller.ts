import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import Events from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/events';
import { OmitType, PartialType } from '@nestjs/mapped-types';

import { EventsService } from './events.service';
import { ScheduleHistoryRequest } from './types/get-schedule-history-request';
import { ScheduleHistoryDoc, ScheduleHistoryResponse } from './types/get-schedule-history-response';

export class PartialEvents extends PartialType<Events>(Events) {
}

export class PartialScheduleHistoryRequest extends OmitType(ScheduleHistoryRequest, [ 'limit', 'offset' ] as const) {}

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {
  }

  @ApiOperation({
    description: 'Get all events',
    operationId: 'GetAllEvents'
  })
  @ApiQuery({
    name    : 'select',
    required: false
  })
  @ApiOkResponse({
    description: 'All events',
    type       : [ Events ]
  })
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('select') select?: string
  ) {
    return this.service.paginate({}, { page, limit, select });
  }

  @ApiOperation({
    description: 'Get schedule history',
    operationId: 'GetScheduleHistory'
  })
  @ApiBody({ description: 'Filter', type: ScheduleHistoryRequest })
  @ApiOkResponse({
    description: 'Filtered events for specified file metadata',
    type       : ScheduleHistoryResponse
  })
  @Post('schedule-history')
  getScheduleHistory(@Body() body: ScheduleHistoryRequest) {
    return this.service.getScheduleHistory(body);
  }

  @ApiOperation({
    description: 'Get schedule history for export to CSV',
    operationId: 'GetScheduleHistoryForExportToCSV'
  })
  @ApiBody({ description: 'Filter', type: ScheduleHistoryRequest })
  @ApiOkResponse({
    description: 'Filtered events for specified file metadata for export to CSV',
    type       : [ ScheduleHistoryDoc ]
  })
  @Post('schedule-history/export')
  getScheduleHistoryForExport(@Body() body: PartialScheduleHistoryRequest) {
    return this.service.getScheduleHistoryForExport(body);
  }

  @ApiOperation({
    description: 'Get event by ID',
    operationId: 'GetEventById'
  })
  @ApiOkResponse({
    description: 'Event found by ID',
    type       : Events
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @ApiOperation({
    description: 'Get most recent event',
    operationId: 'GetMostRecentEvent'
  })
  @ApiBody({ description: 'Filter', type: Events })
  @ApiOkResponse({
    description: 'Most recent event',
    type       : Events
  })
  @Post('most-recent')
  findMostRecent(@Body() filter: PartialEvents) {
    return this.service.findMostRecent(filter);
  }

  @ApiOperation({
    description: 'Update event',
    operationId: 'UpdateEvent'
  })
  @ApiBody({
    description: 'Event data to be updated',
    type       : Events
  })
  @ApiOkResponse({ description: 'Event updated' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: PartialEvents
  ) {
    return this.service.update(id, body);
  }

  @ApiOperation({
    description: 'Create events',
    operationId: 'CreateEvents'
  })
  @ApiBody({
    description: 'Events data',
    type       : [ Events ]
  })
  @ApiCreatedResponse({
    description: 'Events created',
    type       : [ Events ]
  })
  @Post()
  create(@Body() body: Events[]) {
    return this.service.create(body);
  }
}
