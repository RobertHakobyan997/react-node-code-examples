import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import { ObjectId } from 'mongodb';

import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';
import { UserEvents } from '../../core/schemas/user-events.schema';

import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.viewLog)
export class EventsController {

  constructor(private readonly service: EventsService) {
  }
  @ApiOperation({
    description: 'Get all events',
  })
  @ApiOkResponse({
    description: 'Returns all events',
    type       : [ UserEvents ],
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  find() {
    return this.service.find();
  }

  @ApiOperation({
    description: 'Create new events',
  })
  @ApiCreatedResponse({
    description: 'Returns created events',
    type       : [ UserEvents ],
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'UserEvents schema. Array expected',
    type       : [ UserEvents ],
  })
  @Post()
  create(@Body() events: UserEvents[]) {
    return this.service.create(events);
  }

  @ApiOperation({
    description: 'Update event',
  })
  @ApiOkResponse({
    description: 'Returns updated event',
    type       : UserEvents
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'UserEvents schema',
    type       : UserEvents,
  })
  @ApiParam({
    name: 'id', description: 'Event id', example: new ObjectId()
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() events: Partial<UserEvents>) {
    return this.service.update(id, events as UserEvents);
  }

  @ApiOperation({
    description: 'Get events by user',
  })
  @ApiOkResponse({
    description: 'Return paginated events performed on a specific user',
    type       : [ UserEvents ],
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiQuery({ name: 'employeeId', description: 'Employee globalProfileId', example: 1234567 })
  @ApiQuery({ name: 'limit', description: 'Limit of returned events', example: 50 })
  @ApiQuery({ name: 'offset', description: 'Offset of paginated events', example: 0 })
  @ApiQuery({ name: 'field', description: 'Sort field', example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', description: 'Sort order', example: 'desc' })
  @Get('user-events')
  getUserEvents(
    @Query('employeeId') employeeId: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('field') field: string,
    @Query('sortOrder') sortOrder: string,
  ) {
    return this.service.getUserEvents(employeeId, field, sortOrder, offset, limit);
  }
}
