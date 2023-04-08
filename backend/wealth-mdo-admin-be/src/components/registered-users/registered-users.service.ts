import { Injectable } from '@nestjs/common';
import { map, mergeMap, toArray } from 'rxjs/operators';

import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class RegisteredUsersService {
  constructor(private readonly authorizationService: AuthorizationService) {}

  getUsers() {
    return this.authorizationService.getApp().pipe(
      mergeMap(app =>
        this.authorizationService
          .getUsersWithRoles()
          .pipe(map(users => ({ user: users, app: app })))
      ),
      map(({ app, user }) => ({
        userId: user.user._id,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        userEmail: user.user.email,
        employeeId: user.user.globalProfileId,
        domain: 'MERCER',
        clientAcess: user.roles?.[0]?.name ?? 'no access',
        appName: app.name,
      })),
      toArray()
    );
  }
}
