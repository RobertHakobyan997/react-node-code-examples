import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Log } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import DataTransferJobsMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/data-transfer-jobs-metadata';

import { DataTransferJobsMetadataService } from './data-transfer-jobs-metadata.service';

export class PartialDataTransferJobsMetadata extends PartialType<DataTransferJobsMetadata>(DataTransferJobsMetadata) {
}

@ApiTags('Data Transfer Job Metadata')
@Controller('data-transfer-jobs-metadata')
export class DataTransferJobsMetadataController {
  constructor(private readonly service: DataTransferJobsMetadataService) {
  }

  @ApiOkResponse({
    description: 'Returns all data transfer jobs metadata',
    type       : [ DataTransferJobsMetadata ],
  })
  @Get()
  @Log('Get all data transfer jobs metadata')
  findAll() {
    return this.service.findAll();
  }

  @ApiOkResponse({
    description: 'Get all data transfer job metadata which active for current GMT time in metadata`s schedule',
    type       : [ DataTransferJobsMetadata ],
  })
  @Get('schedule')
  @Log('Get active data transfer job metadata')
  getSchedule() {
    return this.service.getSchedule();
  }

  @ApiOkResponse({
    description: 'Get list of job keys',
    type       : [ String ]
  })
  @Get('job-keys')
  @Log('Get list of job keys')
  getJobKeys() {
    return this.service.getJobKeys();
  }

  @ApiOkResponse({
    description: 'Returns data transfer job metadata by id',
    type       : [ DataTransferJobsMetadata ],
  })
  @ApiParam({ name: 'id', description: 'Transfer job metadata id', example: '611f68a99f217cce3a4d91f8' })
  @Get(':id')
  @Log('Get data transfer job metadata')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @ApiOkResponse({
    description: 'Update data transfer job metadata by id',
    type       : DataTransferJobsMetadata
  })
  @ApiBody({
    description: 'Data transfer job metadata',
    type       : DataTransferJobsMetadata,
  })
  @ApiParam({ name: 'id', description: 'Transfer job metadata id', example: '611f68a99f217cce3a4d91f8' })
  @Put(':id')
  @Log('Update data transfer job metadata')
  update(
    @Param('id') id: string,
    @Body() dataTransferJobsMetadata: PartialDataTransferJobsMetadata,
  ) {
    return this.service.updateOne(id, dataTransferJobsMetadata);
  }

  @ApiOkResponse({
    description: 'Creates data transfer job metadata',
    type       : [ DataTransferJobsMetadata ],
  })
  @ApiBody({ description: 'New data transfer job metadata', type: DataTransferJobsMetadata, isArray: true })
  @Post()
  @Log('Create data transfer job metadata')
  create(
    @Body() dataTransferJobsMetadata: DataTransferJobsMetadata[]
  ) {
    return this.service.create(dataTransferJobsMetadata);
  }

  @ApiOkResponse({
    description: 'Deletes data transfer job metadata by id',
    type       : [ DataTransferJobsMetadata ],
  })
  @ApiParam({ name: 'id', description: 'Transfer job metadata id', example: '611f68a99f217cce3a4d91f8' })
  @Delete(':id')
  @Log('Delete data transfer job metadata')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @ApiOkResponse({
    description: 'Returns data transfer job metadata by job key',
    type       : DataTransferJobsMetadata,
  })
  @ApiParam({ name: 'dataTransferJobKey', description: 'Transfer job metadata key', example: 'eagle2Kafka_Entities' })
  @Get('find-by-key/:dataTransferJobKey')
  @Log('Get data transfer job metadata')
  findByJobKey(@Param('dataTransferJobKey') key: string) {
    return this.service.findByJobKey(key);
  }
}
