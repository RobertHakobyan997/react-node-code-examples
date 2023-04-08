import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ServerResponse } from 'http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/permissions.enum';

import { PermissionsGuard, PermissionsMeta } from '../authorization/guards/permissions/permissions.guard';

import { DocumentsService } from './documents.service';

@ApiTags('Documents')
@Controller('documents')
@UseGuards(AuthGuard(), PermissionsGuard)
@PermissionsMeta(Permissions.downloadFile)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {
  }

  @ApiOperation({
    description: 'Download document',
  })
  @ApiQuery({
    name: 'documentId', description: 'Document id', example: '62136455dfe96a8d2c92414a'
  })
  @ApiOkResponse({
    description: 'Download file from documents service',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('download')
  downloadDocument(
    @Query('documentId') documentId,
    @Res() res: ServerResponse,
  ): Observable<void> {
    return this.documentsService
      .downloadFile(documentId)
      .pipe(map(data => res.end(data)));
  }
}
