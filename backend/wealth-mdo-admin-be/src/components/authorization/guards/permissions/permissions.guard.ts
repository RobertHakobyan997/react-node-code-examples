import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { IAuthData } from 'ngpd-merceros-wealth-mdo-common-be/dist/authentication/authentication.type';
import { chain, intersection, isEmpty } from 'lodash';
import { Reflector } from '@nestjs/core';

import { AuthorizationService } from '../../authorization.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly authService: AuthorizationService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const permissions = this.reflector.getAllAndOverride('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isEmpty(permissions)) return true;
    if (!request.headers.authorization) return false;

    const user = await this.authService
      .getUserWithRoles(request.user['employeeId'])
      .toPromise();
    return user && user.roles && this.matchPermissions(permissions, this.getUniqPermissions(user));
  }

  getUniqPermissions(user: IAuthData): string[] {
    return chain(user.roles)
      .map(role => role.permissions)
      .reduce((all, current) => all.concat(current))
      .uniq()
      .value();
  }

  matchPermissions(permissions: string[], userPermissions: string[]): boolean {
    return intersection(permissions, userPermissions).length > 0;
  }
}

export const PermissionsMeta = (...permissions: string[]) => SetMetadata('permissions', permissions);
