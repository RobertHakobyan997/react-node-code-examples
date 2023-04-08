import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import { NonNullable } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/mongoose.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import Validation from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/validation';
import { PartialType } from '@nestjs/mapped-types';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';

import { SecurityKey, SecurityKeyGuard } from '../../core/guards/security-key.guard';

import { FilesMetadataService } from './files-metadata.service';
import { FilesMetadataFilter } from './types/files-metadata-filter.interface';
import { IMPORT_KEYS_TO_OMIT } from './constants/files-metadata-fields.consts';

/**
 * temporary solution, need to move to the separate types and factories
 */

export class PartialFilesMetadata extends PartialType<FilesMetadata>(FilesMetadata) {
}

/**
 * temporary solution, need to move to the separate types and factories
 */

@ApiTags('Files metadata')
@UseGuards(SecurityKeyGuard)
@Controller('files-metadata')
export class FilesMetadataController {
  constructor(private readonly service: FilesMetadataService) {
  }

  @ApiOperation({ description: 'Import data to the collection' })
  @ApiCreatedResponse({
    description: 'Import data to the collection',
    type       : [ FilesMetadata ]
  })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({ name: 'importKey' })
  @ApiBody({ description: 'File metadata', type: [ FilesMetadata ] })
  @SecurityKey({ securityKey: 'dataAccessModule.importKey', headerKey: 'importKey' })
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  importData(@Body() metadata: FilesMetadata[], @UploadedFile() file: Express.Multer.File) {
    const data = file && JSON.parse(file.buffer.toString()) as FilesMetadata[];
    return this.service.importData(data || metadata, IMPORT_KEYS_TO_OMIT);
  }

  @ApiOperation({ description: 'Import data to the collection' })
  @ApiCreatedResponse({
    description: 'Import data to the collection',
    type       : [ FilesMetadata ]
  })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({ name: 'importKey' })
  @ApiBody({ description: 'File metadata', type: [ FilesMetadata ] })
  @SecurityKey({ securityKey: 'dataAccessModule.importKey', headerKey: 'importKey' })
  @Post('import/custom')
  @UseInterceptors(FileInterceptor('file'))
  customImportData(
    @Headers('omitKeys') omitKeys,
    @Body() metadata: FilesMetadata[],
    @UploadedFile() file: Express.Multer.File
  ) {
    const data = file && JSON.parse(file.buffer.toString()) as FilesMetadata[];
    return this.service.importData(data || metadata, omitKeys);
  }

  @ApiOperation({ description: 'Export data from collection' })
  @ApiOkResponse({
    description: 'Export data from collection',
    type       : String
  })
  @SecurityKey({ securityKey: 'dataAccessModule.accessKey', headerKey: 'accessKey' })
  @Get('export')
  exportData(@Query('sort', new DefaultValuePipe('asc')) sort: string): any {
    return this.service.exportData(sort);
  }

  @ApiOperation({ description: 'Get files metadata by ids' })
  @ApiOkResponse({
    description: 'Get files metadata by ids',
    type       : [ FilesMetadata ],
  })
  @ApiQuery({
    name       : 'filesMetadataIds',
    description: 'File metadata ids',
    example    : '603047a5c78ea3004b2fd5f0,609044a5c75ea3005b2fd5a0'
  })
  @Get('files-metadata-by-ids')
  @Log('Get files metadata by ids')
  getFilesMetadataByIds(
    @Query('filesMetadataIds') filesMetadataIds: string,
  ) {
    return this.service.getFilesMetadataByIds(filesMetadataIds);
  }

  @ApiOperation({ description: 'Get all files metadata' })
  @ApiOkResponse({
    description: 'Get all files metadata',
    type       : [ FilesMetadata ],
  })
  @Get()
  @Log('Get all files metadata')
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ description: 'Get all files metadata which active for current GMT time in metadata`s schedule' })
  @ApiOkResponse({
    description: 'Get all files metadata which active for current GMT time in metadata`s schedule',
    type       : [ FilesMetadata ],
  })
  @Get('schedule')
  @Log('Get active files metadata')
  getSchedule() {
    return this.service.getSchedule();
  }

  @ApiOperation({ description: 'Get sorted metadata with replaced keys' })
  @ApiOkResponse({
    type: [ FilesMetadata ]
  })
  @ApiBody({
    description: 'Get sorted metadata with replaced keys'
  })
  @Post('sorted')
  @Log('Get sorted files metadata')
  sorted(@Body() body: FilesMetadataFilter) {
    return this.service.sorted(body);
  }

  @ApiOperation({ description: 'Get schedule statuses' })
  @ApiOkResponse({ description: 'Get schedule statuses' })
  @Get('status')
  @Log('Get schedule statuses')
  getStatus() {
    return this.service.getScheduleStatuses();
  }

  @ApiOperation({ description: 'Get file metadata by id' })
  @ApiOkResponse({
    description: 'Get file metadata by id',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @Get(':id')
  @NonNullable()
  @Log('Get file metadata by id')
  getFileMetadata(@Param('id') id: string) {
    return this.service.getFileMetadata(id);
  }

  @ApiOperation({ description: 'Get detailed file metadata by id' })
  @ApiOkResponse({
    description: 'Get detailed file metadata by id',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @Get(':id/detailed')
  @NonNullable()
  @Log('Get detailed file metadata by id')
  getExtendedFileMetadata(@Param('id') id: string) {
    return this.service.getDetailedFileMetadata(id);
  }

  @ApiOperation({ description: 'Create file metadata' })
  @ApiCreatedResponse({
    description: 'Create file metadata',
    type       : [ FilesMetadata ]
  })
  @ApiBody({
    description: 'Files metadata schema',
    type       : [ FilesMetadata ]
  })
  @Post()
  @Log('Add new files metadata')
  create(@Body() metadata: FilesMetadata[]) {
    return this.service.create(metadata);
  }

  @ApiOperation({ description: 'Update file metadata' })
  @ApiOkResponse({
    description: 'Update file metadata',
    type       : FilesMetadata
  })
  @ApiBody({
    description: 'Files metadata schema',
    type       : FilesMetadata
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @Put(':id')
  @Log('Update files metadata')
  update(
    @Param('id') id: string,
    @Body() body: PartialFilesMetadata
  ) {
    return this.service.update(id, body);
  }

  @ApiOperation({ description: 'Patching file metadata' })
  @ApiOkResponse({
    description: 'Patching file metadata',
    type       : FilesMetadata
  })
  @ApiBody({
    description: 'Files metadata schema',
    type       : FilesMetadata
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @Patch(':id')
  patch(
    @Param('id') id: string,
    // Partial because of validation error contacts.0.each value in nested property contacts must be either object or array
    @Body() body: Partial<FilesMetadata>
  ) {
    return this.service.patch(id, body);
  }

  @ApiOperation({ description: 'Delete file metadata' })
  @ApiOkResponse({
    description: 'Delete file metadata',
    type       : FilesMetadata
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @Delete(':id')
  @Log('Delete files metadata')
  delete(
    @Param('id') id: string,
  ) {
    return this.service.delete(id);
  }

  @ApiOperation({ description: 'Get next working day by file metadata id' })
  @ApiOkResponse({
    description: 'Get next working day by file metadata id',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @ApiQuery({ name: 'date', type: String })
  @ApiQuery({ name: 'format', type: String })
  @Get('next-working-day/:id')
  @NonNullable()
  @Log('Get next working day')
  getNextWorkingDay(
    @Param('id') id: string,
    @Query('date') date: string,
    @Query('format') format: string,
  ) {
    return this.service.getNextWorkingDay(id, date, format);
  }

  @ApiOperation({ description: 'Get next working day by file metadata id' })
  @ApiOkResponse({
    description: 'Get next working day by file metadata id',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @ApiQuery({ name: 'date', type: String })
  @ApiQuery({ name: 'format', type: String })
  @Get('last-working-day/:id')
  @NonNullable()
  @Log('Get last working day')
  getLastWorkingDay(
    @Param('id') id: string,
    @Query('date') date: string,
    @Query('format') format: string,
  ) {
    return this.service.getLastWorkingDay(id, date, format);
  }

  @ApiOperation({ description: 'Get holiday calendar by metadata id' })
  @ApiOkResponse({
    description: 'Get holiday calendar by metadata id',
    type       : HolidayCalendars,
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @Get('holiday-calendar/:id')
  @Log('Get holiday calendar for current files metadata')
  @NonNullable()
  getHolidayCalendar(@Param('id') id: string) {
    return this.service.getHolidayCalendar(id);
  }

  @ApiOperation({ description: 'Get metadata by document id of related file' })
  @ApiOkResponse({
    description: 'Get metadata by document id of related file',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'documentId', example: '603047a5c78ea3004b2fd5f0' })
  @Get('by-related-document/:documentId')
  @Log('Get metadata by document id of related file')
  @NonNullable()
  getMetadaByRelatedFileDocumentId(@Param('documentId') documentId: string) {
    return this.service.getMetadaByRelatedFileDocumentId(documentId);
  }

  @ApiOperation({ description: 'Update files metadata validation' })
  @ApiOkResponse({
    description: 'Update files metadata validation',
    type       : FilesMetadata
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @ApiBody({ description: 'Validation', type: Validation })
  @Put(':id/validation')
  @Log('Update files metadata validation')
  updateValidation(
    @Param('id') id: string,
    @Body() body: Validation
  ) {
    return this.service.updateValidation(id, body);
  }

  @ApiOperation({ description: 'Update files metadata notification emails' })
  @ApiOkResponse({
    description: 'Metadata notification emails updated',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'id', example: '603047a5c78ea3004b2fd5f0' })
  @ApiParam({ name: 'key', example: 'validation' })
  @ApiBody({ description: 'emails array', type: [ String ] })
  @Patch(':id/notifications/:key')
  @Log('Update files metadata notification emails')
  updateNotificationEmails(
    @Param('id') id: string,
    @Param('key') key: string,
    @Body() emails: string[]
  ) {
    return this.service.updateNotificationEmails(id, key, emails);
  }

  @ApiOperation({ description: 'Update Holiday Calendar Ids' })
  @ApiOkResponse({
    type: [ FilesMetadata ]
  })
  @ApiParam({ name: 'id', example: '60cc509c50020128e4d028c4' })
  @ApiBody({ description: 'Update Holiday Calendar Ids' })
  @Put('update-calendars/:id')
  @Log('Update Holiday Calendar Ids')
  updateHolidayCalendars(
    @Param('id') id: string,
    @Body('newHolidayCalendarId') newHolidayCalendarId: string
  ) {
    return this.service.updateHolidayCalendars(id, newHolidayCalendarId);
  }

  @ApiOperation({ description: 'Get file metadatas by supplier' })
  @ApiOkResponse({
    description: 'Get file metadatas by supplier',
    type       : FilesMetadata,
  })
  @ApiParam({ name: 'supplier', example: 'stateStreetFundAccounting' })
  @Get('supplier/:supplier')
  @NonNullable()
  @Log('Get file metadata by supplier')
  getFilesMetadataBySupplier(@Param('supplier') supplier: string): any {
    return this.service.getFilesMetadataBySupplier(supplier);
  }
}
