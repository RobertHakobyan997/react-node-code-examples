import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import MessageTemplates from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/message-templates';
import { PartialType } from '@nestjs/mapped-types';

import { MessageTemplatesService } from './message-templates.service';

export class PartialMessageTemplates extends PartialType<MessageTemplates>(MessageTemplates) {
}

@ApiTags('Message templates')
@Controller('message-templates')
export class MessageTemplatesController {
  constructor(private readonly service: MessageTemplatesService) {
  }

  @ApiOkResponse({
    description: 'Returns all message templates',
    type       : [ MessageTemplates ]
  })
  @Get()
  @Log('Get all message templates')
  findAll() {
    return this.service.findAll();
  }

  @ApiOkResponse({
    description: 'Returns message template by key and method',
    type       : [ MessageTemplates ],
  })
  @ApiQuery({ name: 'key', description: 'key to filter message-template', example: 'priceNotification' })
  @ApiQuery({ name: 'method', description: 'method to filter message-template', example: 'email' })
  @Get('template')
  @Log('Get message-template by filter')
  findOne(@Query('key') key: string, @Query('method') method: string) {
    return this.service.findOne(key, method);
  }

  @ApiOkResponse({
    description: 'Returns message template by id',
    type       : [ MessageTemplates ],
  })
  @ApiParam({ name: 'id', description: 'message-template id', example: '60e42b48ec60e74c8787afa1' })
  @Get(':id')
  @Log('Get message-template')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @ApiOkResponse({
    description: 'Update template by id',
    type       : [ MessageTemplates ],
  })
  @ApiParam({ name: 'id', description: 'message-template id', example: '60e42b48ec60e74c8787afa1' })
  @ApiBody({ description: 'data for update message-template', type: MessageTemplates })
  @Put(':id')
  @Log('Update message-template')
  updateById(
    @Param('id') id: string,
    @Body() template: PartialMessageTemplates
  ) {
    return this.service.updateOne(id, template);
  }

  @ApiOkResponse({
    description: 'Creates message-template',
    type       : [ MessageTemplates ],
  })
  @ApiBody({ description: 'Array of new message-template', type: MessageTemplates })
  @Post()
  @Log('Create message-templates')
  create(@Body() messageTemplates: MessageTemplates[]) {
    return this.service.create(messageTemplates);
  }

  @ApiOkResponse({
    description: 'Deletes message-template by id',
    type       : [ MessageTemplates ],
  })
  @ApiParam({ name: 'id', description: 'message-template id', example: '60e42b48ec60e74c8787afa1' })
  @Delete(':id')
  @Log('Delete message-template')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
