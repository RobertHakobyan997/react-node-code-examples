import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // NOSONAR
import { Reflector } from '@nestjs/core';

import { AuthorizationService } from '../../authorization.service';
import { IAuthRole } from '../../../../types/authorization.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthorizationService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization)
      return false;

    const authToken = this.getAuthToken(request.headers.authorization);
    const tokenData = this.jwtService.decode(authToken);

    const user = await this.authService
      .getUserWithRoles(tokenData['nameID'])
      .toPromise();
    return user && user.roles ? this.matchRoles(roles, user.roles) : false;
  }

  getAuthToken(authToken: string): string {
    return authToken.replace(/Bearer\s+/, '');
  }

  matchRoles(roles: string[], userRoles: IAuthRole[]): boolean {
    return roles.some(role =>
      userRoles.find(userRole => userRole.name === role)
    );
  }
}
