import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import devConfig from '../../config/dev.config';

@Injectable()
export class DataAccessAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.headers?.accesskey === devConfig().dataAccessModule.accessKey;
  }
}
