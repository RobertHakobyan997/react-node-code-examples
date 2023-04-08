import { Injectable } from '@nestjs/common';
import { Observable, zip } from 'rxjs';
import { FileResponseInterface } from 'ngpd-merceros-wealth-mdo-common-fe/dist/files/files-response.type';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import { switchMap } from 'rxjs/operators';

import { RequestService } from '../../core/request/request.service';
import { Statuses } from '../../types/files-statuses.types';
import { FileFilterRequest } from '../../types/file-filter.types';
import { AuthorizationService } from '../authorization/authorization.service';
import { IAuthUser } from '../../types/authorization.types';

import { createFileEvent } from './pure/files.pure';

const querystring = require('querystring');

@Injectable()
export class FilesService {
  constructor(
    private readonly request: RequestService,
    private readonly authorizationService: AuthorizationService
  ) {
  }

  getFiles(): Observable<Files[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files/get-files`;
    return this.request.get<Files[]>(url);
  }

  getStatusData(direction: string): Observable<Statuses> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files/status?direction=${direction.toLowerCase()}`;
    return this.request.get<Statuses>(url);
  }

  getSortedFiles(
    field: string,
    sortOrder: string,
    status: string,
    direction = 'inbound',
    limit = 50,
    offset = 0,
    queryString = '',
  ): Observable<FileResponseInterface> {
    const query = querystring.stringify({
      field      : field,
      sortOrder  : sortOrder,
      status     : status,
      direction  : direction.toLowerCase(),
      limit      : limit,
      offset     : offset,
      queryString: queryString,
    });
    const url = `${process.env.DATA_API_SERVICE_HOST}/files/get-sorted-files?${query}`;
    return this.request.get<FileResponseInterface>(url);
  }

  getFilteredFiles(
    filterRequest: FileFilterRequest
  ): Observable<FileResponseInterface> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files/filtered`;
    return this.request.post<FileResponseInterface>(url, filterRequest);
  }

  updateFileAndLog(fileId: string, file: Partial<Files>, hasErrorFile: boolean, userId: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files/${fileId}`;
    const eventsUrl = `${process.env.DATA_API_SERVICE_HOST}/events`;

    return zip(
      this.request.put(url, file),
      this.authorizationService.getUserWithPermissionsAndRoles(userId)
    ).pipe(
      switchMap(([ updated, { user } ]) =>
        this.logEvent(fileId, updated, eventsUrl, user, hasErrorFile)
      )
    );
  }

  private logEvent(
    fileId: string,
    updated: Files,
    eventsUrl: string,
    user: IAuthUser,
    hasErrorFile: boolean
  ) {
    return this.request.post(eventsUrl, [
      createFileEvent(fileId, updated, user, hasErrorFile),
    ]);
  }
}
