import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { OnLogin, TokenPayload, MssoUser } from 'ngpd-merceros-authentication-be-components';
import { SiemEvent } from 'ngpd-merceros-logger-be';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class UserLoginService implements OnLogin {
  constructor(
    private readonly authService: AuthorizationService,
  ) {
  }

  async onAfterLogin(mssoUser: MssoUser, tokenPayload: TokenPayload, { user }: Request): Promise<void> {
    if (user) {
      const { nameID: employeeId } = user as any;

      const { user: authorizationDBUser }  = await this.authService.getUserWithRoles(employeeId).toPromise();
      if (!authorizationDBUser || !authorizationDBUser.activated)
        throw new ForbiddenException({
          // eslint-disable-next-line max-len
          message:`The email address entered was not found or has not yet been granted permissions to access this site. Please contact your account administrator.`,
          shouldLogout: true,
          statusCode: HttpStatus.FORBIDDEN
        });

      mssoUser.employeeId = employeeId;
    }
  }

  onLoginFailed(errorMessage: string, request: Request, response: Response): void {
    logger.log(`MDO Login Failed: ${errorMessage} | ${JSON.stringify(request)} | ${JSON.stringify(response)}`,
      SiemEvent.LoginFailure, { siem: SiemEvent.LoginFailure });
  }

  onLoginRedirect(request: Request, user?: MssoUser, error?: any): string | void {
    if (error) {
      const { statusCode, message, shouldLogout } = error.response;
      return `${process.env.APP_FRONTEND_HOST}/error?statusCode=${statusCode}&message=${message}&isLoggedOut=${shouldLogout}`;
    }
  }
}
