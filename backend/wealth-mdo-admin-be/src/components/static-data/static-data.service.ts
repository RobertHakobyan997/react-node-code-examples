import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Directions } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';
import TimeZones from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/time-zones';

import { RequestService } from '../../core/request/request.service';
import { StaticDataInterface } from '../../types/static-data.types';

@Injectable()
export class StaticDataService {
  constructor(private readonly request: RequestService) {
  }

  getScheduleStatuses(): Observable<StaticDataInterface[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/schedule-statuses`;
    return this.request.get<StaticDataInterface[]>(url);
  }

  getProcessingStatuses(): Observable<Enum[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/processing-statuses`;
    return this.request.get<Enum[]>(url);
  }

  getFileTypes(): Observable<Enum[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/file-types`;
    return this.request.get<Enum[]>(url);
  }

  getLocations(): Observable<Enum[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/locations`;
    return this.request.get<Enum[]>(url);
  }

  getDirections(): Observable<Directions[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/file-directions`;
    return this.request.get<Directions[]>(url);
  }

  getSuppliers(): Observable<Suppliers[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/suppliers`;
    return this.request.get<Suppliers[]>(url);
  }

  getRegions(): Observable<Enum[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/regions`;
    return this.request.get<Enum[]>(url);
  }

  getCountries(): Observable<Countries[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/countries`;
    return this.request.get<Countries[]>(url);
  }

  getEntityTypes(): Observable<Enum[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/entity-types`;
    return this.request.get<Enum[]>(url);
  }

  getTimeZones(): Observable<TimeZones[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/time-zones`;
    return this.request.get<TimeZones[]>(url);
  }
}
