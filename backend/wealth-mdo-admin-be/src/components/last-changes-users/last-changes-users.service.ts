import { Injectable } from '@nestjs/common';
import { startCase } from 'lodash';
import { zip } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

import { BaseUserEvents } from '../../types/events.types';
import { AuthorizationService } from '../authorization/authorization.service';
import { EventsService } from '../events/events.service';

import { UserStatus } from './constants/user-status.enum';

@Injectable()
export class LastChangesUsersService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly authorizationService: AuthorizationService
  ) {}
  getUsersWithRolesAndBaseEvents() {
    return zip(
      this.authorizationService.getUsersWithRoles().pipe(toArray()),
      this.eventsService.getBaseUsersEvents()
    ).pipe(
      map(([ users, usersEvents ]) => {
        const usersEventsCollection = new Map<string | number, BaseUserEvents>();
        for(const userEvents of usersEvents)
          usersEventsCollection.set(userEvents.userId, userEvents);
        return users.map(({ user, roles }) => {
          const { creationDate, lastChange } = usersEventsCollection.get(user.globalProfileId) ?? {};
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            status: user.activated ? UserStatus.active : UserStatus.inactive,
            role: roles.map(role => role.name).join(','),
            creationDate: creationDate?.toISOString(),
            lastChange: lastChange ? `${lastChange.createdAt.toISOString()}, ${startCase(lastChange.topic)}` : null
          };
        });
      })
    );
  }
}
