import { ActiveSchedule } from 'ngpd-merceros-wealth-mdo-common-be/dist/types';
import { ScheduleStatus } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import { ApiProperty } from '@nestjs/swagger';

export class FileMetadataSortedRequest {
  @ApiProperty({
    description: 'Sort field',
    example: 'createdAt'
 })
  field: string;
  @ApiProperty({
    description: 'Sort order',
    example: 'desc'
 })
  sortOrder: string;
  @ApiProperty({
    description: 'Pagination size limit',
    example: 50
 })
  limit: number;
  @ApiProperty({
    description: 'Pagination offset',
    example: 0
 })
  offset: number;
  @ApiProperty({
    description: 'Included statuses',
    type: [ ScheduleStatus ],
    enum: ScheduleStatus
 })
  statuses: ScheduleStatus[];
  @ApiProperty({
    description: 'File recieved',
    example: 'Yes'
 })
  received: string;
  @ApiProperty({
    description: 'Metadata enabled',
    example: 'true'
 })
  isEnabled: string;
}

export class FileMetadataScheduling extends FilesMetadata {
  @ApiProperty({
    description: 'Metadata scheduling parameters to display',
 })
  scheduleDisplay: ActiveSchedule;
  @ApiProperty({
    description: 'Is file recieved',
    example: 'Yes'
 })
  received: string;
}

export class FileMetadataResponse {
  @ApiProperty({
    description: 'Page number',
    example: 0
 })
  page: number;
  @ApiProperty({
    description: 'Total page count',
    example: 5
 })
  pages: number;
  @ApiProperty({
    description: 'Total docs count',
    example: 100
 })
  totalDocs: number;
  @ApiProperty({
    description: 'Files metadata documents',
    type: [ FileMetadataScheduling ]
 })
  docs: FileMetadataScheduling[];
}

