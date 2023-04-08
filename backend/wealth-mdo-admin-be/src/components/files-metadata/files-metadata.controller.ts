import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiOkResponse, ApiParam, ApiForbiddenResponse, ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import Validation from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/validation';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

import { PermissionsMeta, PermissionsGuard } from '../authorization/guards/permissions/permissions.guard';
import {
  FileMetadataResponse,
  FileMetadataSortedRequest,
} from '../../types/file-metadata-sorted.types';
import { ScheduleStatuses, ScheduleStatusesDto } from '../../types/schedule-statuses.types';
import { User } from '../authorization/decorators/user.decorator';
import { UserEvents } from '../../core/schemas/user-events.schema';

import { FilesMetadataService } from './files-metadata.service';

@ApiTags('Files Metadata')
@Controller('files-metadata')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.dashboardPage, Permissions.fileInformationPage)
export class FilesMetadataController {
  constructor(private readonly filesMetadataService: FilesMetadataService) {
  }

  @ApiOperation({
    description: 'Update file metadata by id and create log event',
  })
  @ApiParam({
    name: 'id', description: 'File metadata id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiBody({
    description: 'Partial Files metadata schema',
    type       : FilesMetadata,
  })
  @ApiOkResponse({
    description: 'Returns logged event of updated metadata',
    type: UserEvents
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Put(':id')
  @PermissionsMeta(Permissions.editMetadata)
  updateWithPut(
    @Param('id') id: string,
    @Body() body: Partial<FilesMetadata>,
    @User('employeeId') employeeId: string
  ) {
    return this.filesMetadataService.update(id, body, employeeId);
  }

  @ApiOperation({
    description: 'Patching file metadata and create log event',
  })
  @ApiParam({
    name: 'id', description: 'File metadata id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiBody({
    description: 'Partial Files metadata schema',
    type       : FilesMetadata,
  })
  @ApiOkResponse({
    description: 'Returns logged event of patched metadata',
    type: UserEvents
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Patch(':id')
  @PermissionsMeta(Permissions.editMetadata)
  updateWithPatch(
    @Param('id') id: string,
    @Body() body: Partial<FilesMetadata>,
    @User('employeeId') employeeId: string
  ) {
    return this.filesMetadataService.patch(id, body, employeeId);
  }

  @ApiOperation({
    description: 'Get schedule statuses from file metadata',
  })
  @ApiOkResponse({
    description: 'Returns counted schedule statuses for files-metadata',
    type: ScheduleStatusesDto
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('status')
  getScheduleStatuses(): Observable<ScheduleStatuses> {
    return this.filesMetadataService.getScheduleStatuses();
  }

  @ApiOperation({
    description: 'Get sorted list of files-metadata',
  })
  @ApiOkResponse({
    description: 'Returns paginated sorted list of files-metadata',
    type: [ FileMetadataResponse ]
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'FileMetadataSortedRequest schema',
    type       : FileMetadataSortedRequest,
  })
  @Post('sorted')
  getSortedFileMetadata(@Body() body: FileMetadataSortedRequest): Observable<FileMetadataResponse[]> {
    return this.filesMetadataService.getSortedFileMetadata(body);
  }

  @ApiOperation({
    description: 'Get files-metadata by Id',
  })
  @ApiParam({
    name: 'id', description: 'File metadata id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiOkResponse({
    description: 'Returns files-metadata by Id',
    type:  FileMetadataResponse
  })
  @Get(':id')
  getById(@Param('id') id: string): Observable<FileMetadataResponse> {
    return this.filesMetadataService.getById(id);
  }

  @ApiOperation({
    description: 'Get detailed files-metadata by Id',
  })
  @ApiParam({
    name: 'id', description: 'File metadata id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiOkResponse({
    description: 'Returns detailed files-metadata by Id',
    type:  FilesMetadata
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get(':id/detailed')
  getExtendedById(@Param('id') id: string): Observable<FilesMetadata<Enum>> {
    return this.filesMetadataService.getDetailedById(id);
  }

  @ApiOperation({
    description: 'Update file metadata validation',
  })
  @ApiParam({
    name: 'id', description: 'File metadata id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiOkResponse({
    description: 'Returns updated file metadata',
    type:  FilesMetadata
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'Validation',
    type       : Validation,
  })
  @Put(':id/validation/')
  @PermissionsMeta(Permissions.editMetadata)
  async updateValidation(
    @Param('id') id: string,
    @Body() body: Validation
    ) {
    return this.filesMetadataService.updateValidation(id, body);
  }

  @ApiOperation({
    description: 'Get file metadatas by supplier',
  })
  @ApiParam({
    name: 'supplier', description: 'Supplier name', example: 'stateStreetFundAccounting'
  })
  @ApiOkResponse({
    description: 'Returns all file metadata by supplier',
    type:  [ FilesMetadata ]
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('supplier/:supplier')
  getBySupplier(@Param('supplier') supplier: string) {
    return this.filesMetadataService.getBySupplier(supplier);
  }

  @ApiOperation({
    description: 'Update file metadata notification emails',
  })
  @ApiParam({
    name: 'id', description: 'File metadata id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiParam({
    name: 'key', description: 'Notification key', example: 'alerts'
  })
  @ApiBody({
    description: 'Array of emails',
    type       : [ String ],
  })
  @ApiOkResponse({
    description: 'Returns updated file metadata',
    type:  FilesMetadata
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Patch(':id/notifications/:key')
  @PermissionsMeta(Permissions.editMetadata)
  async updateNotificationEmails(
    @Param('id') id: string,
    @Param('key') key: string,
    @Body() emails: string[]
    ) {
    return this.filesMetadataService.updateNotificationEmails(id, key, emails);
  }
}
