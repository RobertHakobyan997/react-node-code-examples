import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataAccessService } from './data-access.service';

@Injectable()
export class DbQueryTransformInterceptor implements NestInterceptor {
  constructor(
    private readonly service: DataAccessService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.service.disableLooseObjectIdDetection();

    const reqBody = context.switchToHttp().getRequest().body;
    if (reqBody instanceof Array) {
      reqBody.forEach(singleObject => this.service.recursiveAddObjects(singleObject));

      return next.handle().pipe(map(data => ({ data })));
    }

    this.service.recursiveAddObjects(reqBody);

    return next.handle().pipe(map(data => ({ data })));
  }
}
