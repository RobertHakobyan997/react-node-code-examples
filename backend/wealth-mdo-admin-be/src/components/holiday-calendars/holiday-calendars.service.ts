import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import HolidayCalendars from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/holiday-calendars';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { RequestService } from '../../core/request/request.service';
import {
  HolidayCalendarsResponse,
  HolidayCalendarsSortedRequest
} from '../../types/holiday-calendars.types';

@Injectable()
export class HolidayCalendarsService {
  constructor(private readonly request: RequestService) {
  }

  createHolidayCalendars(body: HolidayCalendars[]): Observable<HolidayCalendars[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars`;
    return this.request.post(url, body);
  }

  getHolidayCalendars(): Observable<HolidayCalendars[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars`;
    return this.request.get(url);
  }

  getSortedHolidayCalendars(sortParams: HolidayCalendarsSortedRequest): Observable<HolidayCalendarsResponse> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars/sorted`;
    return this.request.post<HolidayCalendarsResponse>(url, sortParams);
  }

  updateHolidayCalendar(id: string, body: Partial<HolidayCalendars>): Observable<HolidayCalendars> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars/${id}`;
    return this.request.put(url, body);
  }

  updateContacts(id: string, emails: string[]): Observable<HolidayCalendars> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars/${id}/contacts`;
    return this.request.patch(url, emails);
  }

  toggleHolidayCalendarDisable(id: string, body: Partial<HolidayCalendars>) {
    const filesMetadataUrl = `${process.env.DATA_API_SERVICE_HOST}/files-metadata/update-calendars/${id}`;
    const holidayCalendarsUrl = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars/${id}`;
    return this.request.put(filesMetadataUrl).pipe(
      mergeMap(() => this.request.put(holidayCalendarsUrl, body)),
      catchError(err => of(err))
    );
  }

  deleteHolidayCalendar(id: string): Observable<HolidayCalendars> {
    return this.request
      .delete(`${process.env.DATA_API_SERVICE_HOST}/holiday-calendars/${id}`)
      .pipe(
        switchMap(() => this.request.put(`${process.env.DATA_API_SERVICE_HOST}/files-metadata/update-calendars/${id}`))
      );
  }

  getExpiringHolidayCalendars(): Observable<HolidayCalendars[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/holiday-calendars/expiring`;
    return this.request.get(url);
  }
}
