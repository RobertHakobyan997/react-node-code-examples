import { Injectable } from '@nestjs/common';
import { AuthClientApi } from 'ngpd-merceros-authorization-client-be';

import appConfig from '../../config/app.config';
import { authClientConfig } from '../../config/authorization.config';
import { RequestService } from '../../core/request/request.service';

@Injectable()
export class AuthorizationClientService extends AuthClientApi {
  constructor(private readonly request: RequestService) {
    super(request as any, appConfig.name, authClientConfig);
  }
}
