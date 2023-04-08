import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';
import { FileResponseInterface } from 'ngpd-merceros-wealth-mdo-common-fe/dist/files/files-response.type';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';

import { PermissionsMeta, PermissionsGuard } from '../authorization/guards/permissions/permissions.guard';
import { Statuses } from '../../types/files-statuses.types';
import { FileFilterRequest } from '../../types/file-filter.types';
import { User } from '../authorization/decorators/user.decorator';

import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
@UseGuards(AuthGuard(), PermissionsGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {
  }

  @ApiOperation({
    description: 'Get list of files',
  })
  @Get('get-files')
  getFiles(): Observable<Files[]> {
    return this.filesService.getFiles();
  }

  @ApiOperation({
    description: 'Get list of all sorted files',
  })
  @Get('get-sorted-files')
  @PermissionsMeta(Permissions.dashboardPage)
  getSortedFiles(
    @Query('field') field: string,
    @Query('sortOrder') sortOrder: string,
    @Query('status') status: string,
    @Query('direction') direction: string,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('queryString') queryString: string,
  ): Observable<FileResponseInterface> {
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
    description: 'Retrieve list of all filtered files',
  })
  @Post('filtered')
  @PermissionsMeta(Permissions.fileSearchPage)
  getFilteredFiles(
    @Body() body: FileFilterRequest,
  ): Observable<FileResponseInterface> {
    return this.filesService.getFilteredFiles(body);
  }

  @ApiOperation({
    description: 'Get files statuses',
  })
  @Get('get-status-data')
  @PermissionsMeta(Permissions.dashboardPage)
  getStatusData(
    @Query('direction') direction: string,
  ): Observable<Statuses> {
    return this.filesService.getStatusData(direction);
  }

  @ApiOperation({
    description: 'Update file and log',
  })
  @Put('update-and-log/:id')
  @PermissionsMeta(Permissions.dashboardPage)
  updateFileAndLog(
    @Param('id') id: string,
    @Query('hasErrorFile') hasErrorFile: boolean,
    @Body() body: Partial<Files>,
    @User('employeeId') employeeId: string
  ) {
    return this.filesService.updateFileAndLog(id, body, hasErrorFile, employeeId);
  }
}
