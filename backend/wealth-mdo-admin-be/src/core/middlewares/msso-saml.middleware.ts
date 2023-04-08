import { NextFunction, Request, Response } from 'express';
import { MssoSamlUser } from 'ngpd-merceros-authentication-be-components';
import passport from 'passport';

export function mssoSaml(request: Request, response: Response, next: NextFunction): Promise<MssoSamlUser> {
  return passport.authenticate('msso-saml', (error, user: MssoSamlUser) => {
    if (error || !user) return next(error);
    request.user = user;
    return next();
  })(request, response, next);
}
