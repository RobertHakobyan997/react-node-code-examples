import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import devConfig from '../../config/dev.config';

@Injectable()
export class DevGuard implements CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return devConfig().getEnvEnabled;
  }
}
