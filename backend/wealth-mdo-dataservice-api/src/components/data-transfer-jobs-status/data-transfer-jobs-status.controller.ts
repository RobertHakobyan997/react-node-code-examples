import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import DataTransferJobsStatus from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-status';
import { PartialType } from '@nestjs/mapped-types';

import { DataTransferJobsStatusService } from './data-transfer-jobs-status.service';

export class PartialDataTransferJobsStatus extends PartialType<DataTransferJobsStatus>(DataTransferJobsStatus) {
}

@ApiTags('Data Transfer Job Statuses')
@Controller('data-transfer-jobs-status')
export class DataTransferJobsStatusController {
  constructor(private readonly service: DataTransferJobsStatusService) {
  }

  @ApiOkResponse({
    description: 'Returns all data transfer jobs status',
    type       : [ DataTransferJobsStatus ]
  })
  @Get()
  @Log('Get all data transfer jobs status')
  findAll() {
    return this.service.findAll();
  }

  @ApiOkResponse({
    description: 'Returns data transfer job status by id',
    type       : DataTransferJobsStatus,
  })
  @ApiParam({ name: 'id' })
  @Get(':id')
  @Log('Get data transfer job status')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @ApiOkResponse({
    description: 'Get files by files metadata id',
    type       : DataTransferJobsStatus,
  })
  @ApiParam({ name: 'jobMetaDataId', description: 'Metadata id' })
  @Get('metadata/:jobMetaDataId')
  @Log('Get files by job metadata id')
  getFilesByMetadataId(@Param('jobMetaDataId') jobMetaDataId: string) {
    return this.service.getJobMetadataStatuses(jobMetaDataId);
  }

  @ApiOkResponse({ description: 'Update data transfer job status by id' })
  @ApiBody({
    description: 'Data transfer job status',
    type       : DataTransferJobsStatus,
  })
  @ApiParam({ name: 'id' })
  @ApiBody({ description: 'Data transfer job status', type: DataTransferJobsStatus })
  @Put(':id')
  @Log('Update data transfer job status of existing item')
  update(
    @Param('id') id: string,
    @Body() dataTransferJobsStatus: PartialDataTransferJobsStatus,
  ) {
    return this.service.update(id, dataTransferJobsStatus);
  }

  @ApiOkResponse({ description: 'Update/Create data transfer job status by job metadata id' })
  @ApiBody({
    description: 'Data transfer job status',
    type       : DataTransferJobsStatus,
  })
  @ApiParam({ name: 'jobMetaDataId', description: 'Metadata id' })
  @ApiBody({ description: 'Data transfer job status', type: DataTransferJobsStatus })
  @Put('metadata/:jobMetaDataId')
  @Log('Update data transfer job status of existing item or create the new one')
  updateJobMetadataStatuses(
    @Param('jobMetaDataId') id: string,
    @Body() dataTransferJobsStatus: Partial<DataTransferJobsStatus>,
  ) {
    return this.service.updateJobMetadataStatuses(id, dataTransferJobsStatus);
  }

  @ApiOkResponse({
    description: 'Creates data transfer job status',
    type       : [ DataTransferJobsStatus ],
  })
  @ApiBody({ description: 'New data transfer job status', type: [ DataTransferJobsStatus ] })
  @Post()
  @Log('Create data transfer job status')
  create(
    @Body() dataTransferJobsStatus: DataTransferJobsStatus[]
  ) {
    return this.service.create(dataTransferJobsStatus);
  }

  @ApiOkResponse({
    description: 'Deletes data transfer job status by id',
    type       : [ DataTransferJobsStatus ],
  })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @Log('Delete data transfer job status')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
