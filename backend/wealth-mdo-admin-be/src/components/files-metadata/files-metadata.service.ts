import { Injectable } from '@nestjs/common';
import { Observable, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import FilesMetadata from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files-metadata';
import Validation from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/validation';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { pick } from 'lodash';

import { RequestService } from '../../core/request/request.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { FileMetadataResponse, FileMetadataSortedRequest } from '../../types/file-metadata-sorted.types';
import { ScheduleStatuses } from '../../types/schedule-statuses.types';
import { IAuthUser } from '../../types/authorization.types';

import { createFileMetadataEvent } from './pure/files-metadata.pure';

@Injectable()
export class FilesMetadataService {
  constructor(
    private readonly request: RequestService,
    private readonly authorizationService: AuthorizationService,
  ) {
  }

  getAllFilesMetadata(): Observable<FilesMetadata[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata`;
    return this.request.get<FilesMetadata[]>(url);
  }

  getScheduleStatuses(): Observable<ScheduleStatuses> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/status`;
    return this.request.get(url);
  }

  getSortedFileMetadata(sortParams: FileMetadataSortedRequest): Observable<FileMetadataResponse[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/sorted`;
    return this.request.post<FileMetadataResponse[]>(url, sortParams);
  }

  getById(id: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/${id}`;
    return this.request.get<FileMetadataResponse>(url);
  }

  getDetailedById(id: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/${id}/detailed`;
    return this.request.get<FilesMetadata<Enum>>(url);
  }

  update(id: string, metadata: Partial<FilesMetadata>, userId: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/${id}`;
    const eventsUrl = `${process.env.DATA_API_SERVICE_HOST}/events`;

    return zip(
      this.request.get<FilesMetadata>(url),
      this.authorizationService.getUserWithPermissionsAndRoles(userId),
      this.request.put<FilesMetadata>(url, metadata)
    )
      .pipe(
        switchMap(([ oldValue, { user } ]) => this.logEvent(oldValue, metadata, eventsUrl, user)),
      );
  }

  patch(id: string, metadata: Partial<FilesMetadata>, userId: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/${id}`;
    const eventsUrl = `${process.env.DATA_API_SERVICE_HOST}/events`;

    return zip(
      this.request.patch<FilesMetadata>(url, metadata),
      this.authorizationService.getUserWithPermissionsAndRoles(userId),
    )
      .pipe(
        switchMap(([ updated, { user } ]) => this.logEvent(updated, metadata, eventsUrl, user)),
      );
  }

  async updateValidation(id: string, body: Validation) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/${id}/validation`;
    return this.request.put<FilesMetadata>(url, body);
  }

  async updateNotificationEmails(id: string, key: string, emails: string[]) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/${id}/notifications/${key}`;
    return this.request.patch<FilesMetadata>(url, emails);
  }

  getBySupplier(supplier: string) {
    return this.request.get(`${process.env.DATA_API_SERVICE_HOST}/files-metadata/supplier/${supplier}`);
  }

  private logEvent(oldMetadata: FilesMetadata, metadata: Partial<FilesMetadata<string>>, eventsUrl: string, user: IAuthUser) {
    const oldValue = pick(oldMetadata, Object.keys(metadata));
    return this.request.post(eventsUrl, [ createFileMetadataEvent(oldMetadata._id, metadata, oldValue, user) ]);
  }
}
