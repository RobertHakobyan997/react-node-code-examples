import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import devConfig from '../../config/dev.config';

@Injectable()
export class ReadOnlyGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isAllowWrite = devConfig().dataAccessModule.allowWrite;
    if (!isAllowWrite) {
      const request = context.switchToHttp().getRequest();
      return request.headers?.importkey === devConfig().dataAccessModule.importKey;
    }
    return true;
  }
}
