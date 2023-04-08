import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import devConfig from '../../../config/dev.config';

@Injectable()
export class SecurityKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  /**
   * @throws {ForbiddenException} if headers don't contain applicable keys
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const keys = this.reflector.get<{ securityKey: string; headerKey: string }>('keys', context.getHandler());
    if (!keys || !keys.securityKey) return true;

    const request = context.switchToHttp().getRequest();
    if (keys.headerKey && request.get(keys.headerKey) === devConfig[keys.securityKey]) return true;

    throw new ForbiddenException();
  }
}

export const SecurityKey = (keys: { securityKey: string; headerKey: string }) => SetMetadata('keys', keys);
