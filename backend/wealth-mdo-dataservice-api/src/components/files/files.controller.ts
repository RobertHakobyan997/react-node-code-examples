import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Directions, Status } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import { NonNullable } from 'ngpd-merceros-wealth-mdo-common-be/dist/core/decorators/mongoose.decorator';
import { PartialType } from '@nestjs/mapped-types';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';

import { FilesService } from './files.service';
import { FileFilterRequest } from './types/file-filter.interface';
import { FileStatusCalculation } from './types/file-status-calculation.interface';

export class PartialFiles extends PartialType<Files>(Files) {
}

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {
  }

  @ApiOperation({
    description: 'Get sorted list of files',
    operationId: 'GetSortedListOfFiles'
  })
  @ApiOkResponse({
    description: 'Sorted list of files',
    type       : [ Files ],
  })
  @ApiQuery({ name: 'field', description: 'Sort by this field', example: 'fileName' })
  @ApiQuery({ name: 'sortOrder', description: 'Sorting order', example: 'asc' })
  @ApiQuery({ name: 'status', description: 'Record status', example: Status.all })
  @ApiQuery({ name: 'direction', description: 'File direction', example: 'inbound' })
  @ApiQuery({ name: 'limit', description: 'Limit of returning records', example: '50' })
  @ApiQuery({ name: 'offset', description: 'Number of skipping records', example: '0' })
  @ApiQuery({ name: 'queryString', description: 'Search files by this query', example: 'BNP_' })
  @Get([ 'sorted', 'get-sorted-files' ]) // backward compatibility
  @Log('Get sorted list of files')
  getSortedFiles(
    @Query('field') field: string,
    @Query('sortOrder') sortOrder: string,
    @Query('status') status: string,
    @Query('direction') direction: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('queryString') queryString: string,
  ) {
    return this.filesService.getSortedFiles(
      field,
      sortOrder,
      status,
      direction,
      limit,
      offset,
      queryString,
    );
  }

  @ApiOperation({
    description: 'Get files statuses',
    operationId: 'GetFilesStatuses'
  })
  @ApiOkResponse({ description: 'Get files statuses' })
  @ApiQuery({ name: 'direction', description: 'File direction', example: 'inbound' })
  @Get('status')
  @Log('Get files statuses')
  getStatus(@Query('direction') direction: Directions) {
    return this.filesService.getStatusData(direction);
  }

  @ApiOperation({
    description: 'Calculate timing status',
    operationId: 'CalculateTimingStatus'
  })
  @ApiCreatedResponse({ description: 'Timing status calculated' })
  @Post('calculate')
  @Log('Calculate timing status')
  calculateStatusPost(@Body() body: FileStatusCalculation) {
    return this.filesService.calculateStatus(body);
  }

  @ApiOperation({
    description: 'Add new file',
    operationId: 'AddNewFile'
  })
  @ApiBody({
    description: 'File data',
    type       : Files
  })
  @ApiCreatedResponse({ description: 'File added' })
  @Post()
  @Log('Add new file')
  create(@Body() body: Files) {
    return this.filesService.create(body);
  }

  @ApiOperation({
    description: 'Get most recent file by name',
    operationId: 'GetMostRecentFileByName'
  })
  @ApiOkResponse({
    description: 'Most recent file found by name',
    type       : Files,
  })
  @ApiQuery({ name: 'fileName', description: 'Get recent file by this fileName', example: 'BNP_' })
  @Get('recent')
  @NonNullable()
  @Log('Get most recent file by name')
  getRecentFile(@Query('fileName') fileName: string) {
    return this.filesService.getRecentFile(fileName);
  }

  @ApiOperation({
    description: 'Get all files by processing status',
    operationId: 'GetAllFilesByProcessingStatus'
  })
  @ApiOkResponse({
    description: 'File found by processing status',
    type       : Files,
  })
  @Get('by-status')
  @Log('Get all files by processing status')
  getFilesByStatus(
    @Query('processingStatus') processingStatus: string,
  ) {
    return this.filesService.getFilesByStatus(processingStatus);
  }

  @ApiOperation({
    description: 'Get the last processed file by metadata ID',
    operationId: 'GetTheLastProcessedFileByMetadataId'
  })
  @ApiOkResponse({
    description: 'Last processed file found by metadata id',
    type       : Files,
  })
  @ApiQuery({ name: 'filesMetadataId', description: 'Get latest file by this fileMetadataId' })
  @Get('last-processed/:filesMetadataId')
  @Log('Get the last processed file by metadata ID')
  getLastProcessedFile(
    @Param('filesMetadataId') filesMetadataId: string,
    @Query('success', new DefaultValuePipe(false), ParseBoolPipe) success: boolean
  ){
    return this.filesService.getLastProcessedFile(filesMetadataId, success);
  }

  @ApiOperation({
    description: 'Get the last processed files by metadata IDs',
    operationId: 'GetTheLastProcessedFilesByMetadataIds'
  })
  @ApiOkResponse({
    description: 'Last processed files by metadata IDs',
    type       : Files,
  })
  @ApiQuery({ name: 'filesMetadataIds', description: 'Get latest files by this fileMetadataIds' })
  @Get('last-processed-files')
  @Log('Get the latest processed files by metadata ids')
  getLastFilesByMetadataIds(
    @Query('filesMetadataIds') filesMetadataIds: string,
  ){
    return this.filesService.getLastFilesByMetadataIds(filesMetadataIds);
  }

  @ApiOperation({
    description: 'Get all files',
    operationId: 'GetAllFiles'
  })
  @ApiOkResponse({
    description: 'All files',
    type       : [ Files ],
  })
  @Get([ '', 'get-files' ]) // backward compatibility
  @Log('Get all files')
  getFiles() {
    return this.filesService.findAll();
  }

  @ApiOperation({
    description: 'Get file by ID',
    operationId: 'GetFileById'
  })
  @ApiOkResponse({
    description: 'File found by id',
    type       : Files,
  })
  @Get(':fileId')
  @Log('Get file by id')
  @NonNullable()
  getFileById(@Param('fileId') fileId: string) {
    return this.filesService.getFile(fileId);
  }

  @ApiOperation({
    description: 'Get files by files metadata ID',
    operationId: 'GetFilesByFilesMetadataId'
  })
  @ApiOkResponse({
    description: 'Files filtered by files metadata ID',
    type       : [ Files ],
  })
  @Get('metadata/:filesMetadataId')
  @Log('Get files by files metadata ID')
  getFilesByMetadataId(@Param('filesMetadataId') filesMetadataId: string) {
    return this.filesService.getFilesByMetadataId(filesMetadataId);
  }

  @ApiOperation({
    description: 'Get file by master file ID',
    operationId: 'GetFileByMasterFileId'
  })
  @ApiOkResponse({
    description: 'File found by master file ID',
    type       : Files,
  })
  @Get('master-file/:masterFileId')
  @Log('Get file by master file ID')
  getFileByMasterFileId(@Param('masterFileId') masterFileId: string) {
    return this.filesService.getFileByMasterFileId(masterFileId);
  }

  @ApiOperation({
    description: 'Update file',
    operationId: 'UpdateFile'
  })
  @ApiBody({
    description: 'File data',
    type       : Files
  })
  @ApiOkResponse({
    description: 'File updated',
    type       : Files,
  })
  @Put(':id')
  @Log('Update file')
  updateFile(
    @Param('id') id: string,
    @Body() file: Partial<Files>,
  ) {
    return this.filesService.update(id, file);
  }

  @ApiOperation({
    description: 'Get all filtered files',
    operationId: 'GetAllFilteredFiles'
  })
  @ApiOkResponse({
    description: 'Filtered files',
    type       : [ Files ]
  })
  @Post('filtered')
  @Log('Get all filtered files')
  getFilteredFiles(@Body() body: FileFilterRequest) {
    return this.filesService.getFilteredFiles(body);
  }
}
