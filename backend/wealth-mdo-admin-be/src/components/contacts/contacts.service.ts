import { Injectable } from '@nestjs/common';
import Contacts from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/contacts';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ContactsSortedRequest, ContactsResponse } from '../../types/contacts-sorted.types';
import { CreateContact, UpdateContactRequest } from '../../types/contacts.types';
import { RequestService } from '../../core/request/request.service';

@Injectable()
export class ContactsService {
  constructor(private readonly request: RequestService) {}

  create(contact: CreateContact) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/contacts`;
    return this.request.post<Contacts[]>(url, contact);
  }

  getContacts(supplier: string): Observable<Contacts[]> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/contacts/supplier/${supplier}`;
    return this.request.get<Contacts[]>(url);
  }

  getSortedContacts(sortParams: ContactsSortedRequest): Observable<ContactsResponse> {
    const url = `${process.env.DATA_API_SERVICE_HOST}/contacts/sorted`;
    return this.request.post<ContactsResponse>(url, sortParams);
  }

  updateContact(id: string, body: UpdateContactRequest) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/contacts/${id}`;
    return this.request.put<Contacts>(url, body);
  }

  delete(id: string) {
    const url = `${process.env.DATA_API_SERVICE_HOST}/contacts/${id}`;
    return this.request.delete<Contacts>(url).pipe(pluck('data'));
  }
}
