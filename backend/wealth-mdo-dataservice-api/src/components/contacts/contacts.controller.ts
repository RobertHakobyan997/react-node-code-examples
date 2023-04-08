import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiOkResponse, ApiBody, ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { ContactsFilter } from './types/contacts-filter-request';
import { CreateContactRequest } from './types/create-contact-request';
import { ContactsService } from './contacts.service';
import { UpdateContactRequest } from './types/update-contact-request';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {
  }

  @ApiOperation({
    description: 'Create contact',
    operationId: 'CreateContact'
  })
  @ApiBody({
    description: 'Contact data',
    type       : CreateContactRequest
  })
  @ApiCreatedResponse({
    description: 'Contact created',
    type       : Contacts
  })
  @Post()
  @Log('Create contact')
  create(@Body() body: CreateContactRequest) {
    return this.service.create(body);
  }

  @ApiOperation({
    description: 'Get all contacts',
    operationId: 'GetAllContacts'
  })
  @ApiOkResponse({
    description: 'All contacts',
    type       : [ Contacts ]
  })
  @Get()
  @Log('Get all contacts')
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    description: 'Get sorted list of contacts',
    operationId: 'GetSortedListOfContacts'
  })
  @ApiBody({
    description: 'Filter',
    type       : ContactsFilter
  })
  @ApiOkResponse({
    description: 'Sorted list of contacts',
    type       : [ Contacts ]
  })
  @Post('sorted')
  @Log('Get sorted list of contacts')
  getSortedContacts(@Body() body: ContactsFilter): any {
    return this.service.getSortedContacts(body);
  }

  @ApiOperation({
    description: 'Update contact',
    operationId: 'UpdateContact'
  })
  @ApiBody({
    description: 'Contact data to be updated',
    type       : UpdateContactRequest
  })
  @ApiOkResponse({ description: 'Contact updated' })
  @Put(':id')
  @Log('Update contact')
  update(
    @Param('id') id: string,
    @Body() body: UpdateContactRequest
  ) {
    return this.service.updateContact(id, body);
  }

  @ApiOperation({
    description: 'Delete contact',
    operationId: 'DeleteContact'
  })
  @ApiOkResponse({
    description: 'Contact deleted',
    type       : Contacts
  })
  @Delete(':id')
  @Log('Delete contact')
  delete(@Param('id') id: string){
    return this.service.delete(id);
  }

  @ApiOperation({
    description: 'Get all contacts by supplier',
    operationId: 'GetAllContactsBySupplier'
  })
  @ApiOkResponse({
    description: 'All contacts filtered by supplier',
    type       : [ Contacts ]
  })
  @Get('supplier/:supplier')
  @Log('Get all contacts by supplier')
  findBySupplier(@Param('supplier') supplier: string) {
    return this.service.findAll({ supplier });
  }
}
