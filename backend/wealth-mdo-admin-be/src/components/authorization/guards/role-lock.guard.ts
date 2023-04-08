import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { filter, map, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthorizationService } from '../authorization.service';
@Injectable()
export class RoleLockGuard implements CanActivate {

  constructor(private readonly service: AuthorizationService) {
  }

  canActivate(context: ExecutionContext): Observable<boolean> {
    const { query, body, user } = context.switchToHttp().getRequest();
    const { id } = query;
    const { _id } = body;
    const userId = _id ?? id;
    // In body.globalProfileId lies employeeId
    const isLoggedInUser = user.employeeId === body.globalProfileId;
    return this.service.getUsersWithRoles()
      .pipe(
        // ToDo: create config collection and take user roles from DB
        filter(user => user.roles.some(role => role.name === 'security admin')),
        toArray(),
        map(securityAdmins => securityAdmins.filter(({ user }) => user.activated)),
        map(securityAdmins => securityAdmins.length > 1 || !securityAdmins.some(({ user }) => user._id === userId)),
        map(result => {
          if (!result || isLoggedInUser)
            throw new BadRequestException('You cannot perform this action');

          return result;
        })
      );
  }
}
