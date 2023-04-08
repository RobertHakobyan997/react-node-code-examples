import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SecurityKeyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) {
  }

  /**
   * @throws {ForbiddenException} if headers don't contain applicable keys
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const keys = this.reflector.get<{ securityKey: string; headerKey: string }>('keys', context.getHandler());
    if (!keys || !keys.securityKey) return true;

    const request = context.switchToHttp().getRequest();
    if (keys.headerKey && request.get(keys.headerKey) === this.configService.get(keys.securityKey)) return true;

    throw new ForbiddenException();
  }
}

export const SecurityKey = (keys: { securityKey: string; headerKey: string }) => SetMetadata('keys', keys);
