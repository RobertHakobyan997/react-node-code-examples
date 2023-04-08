import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiForbiddenResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';

import { ContactsSortedRequest, ContactsResponse } from '../../types/contacts-sorted.types';
import { CreateContact, UpdateContactRequest } from '../../types/contacts.types';
import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';

import { ContactsService } from './contacts.service';

@ApiTags('Contacts')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.manageContactsPage)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}
  @ApiOperation({
    description: 'Create contacts',
  })
  @ApiOkResponse({
    description: 'Returns created contacts',
    type: [ Contacts ]
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'CreateContact schema',
    type       : CreateContact,
  })
  @Post()
  @PermissionsMeta(Permissions.addContacts)
  create(@Body() contact: CreateContact){
    return this.service.create(contact);
  }

  @ApiOperation({
    description: 'Get contacts by supplier',
  })
  @ApiOkResponse({
    description: 'Returns Contacts',
    type: [ Contacts ]
  })
  @ApiQuery({
    name: 'supplier', description: 'Supplier', example: 'jpMorgan'
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  @PermissionsMeta(Permissions.viewMetadataContacts)
  getContacts(
    @Query('supplier') supplier: string,
  ) {
    return this.service.getContacts(supplier);
  }

  @ApiOperation({
    description: 'Get sorted list of contacts'
  })
  @ApiOkResponse({
    description: 'Returns Contacts',
    type: ContactsResponse
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'ContactsSortedRequest',
    type: ContactsSortedRequest
  })
  @Post('sorted')
  getSortedContacts(@Body() body: ContactsSortedRequest): Observable<ContactsResponse> {
    return this.service.getSortedContacts(body);
  }

  @ApiOperation({
    description: 'Update contact by Id'
  })
  @ApiOkResponse({
    description: 'Returns updated contact',
    type: Contacts
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiParam({
    name: 'id', description: 'Contact id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiBody({
    description: 'UpdateContactRequest',
    type: UpdateContactRequest
  })
  @Put(':id')
  @PermissionsMeta(Permissions.editContacts)
  updateContact(
    @Param('id') id: string,
    @Body() body: UpdateContactRequest
  ) {
    return this.service.updateContact(id, body);
  }

  @ApiOperation({
    description: 'Delete contact by Id'
  })
  @ApiOkResponse({
    description: 'Delete contact'
  })
  @ApiParam({
    name: 'id', description: 'Contact id', example: '62136455dfe96a8d2c92414a'
  })
  @Delete(':id')
  @PermissionsMeta(Permissions.deleteContacts)
  delete(@Param('id') id: string){
    return this.service.delete(id);
  }
}
