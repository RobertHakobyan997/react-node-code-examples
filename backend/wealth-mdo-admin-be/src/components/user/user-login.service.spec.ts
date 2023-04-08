import { of } from 'rxjs';
import { Request } from 'express';

import { AuthorizationService } from '../authorization/authorization.service';
import { mockMssoSamlUser, mockMssoUser } from '../../../test/data/authentication/msso-saml-user';
import { mockDeactivatedUser, mockNotFoundUser, mockForbiddenError } from '../../../test/data/authorization';
import { mockPayloadToken } from '../../../test/data/authentication/user-login.const';

import { UserLoginService } from './user-login.service';
import { assert } from './user-login.service.spec-setup';

describe('UserLogin service: ', () => {
  let userLoginService: UserLoginService;
  let authorizationService: AuthorizationService;
  const mockRequest = {} as Request;
  const shouldLogout = true;
  const message = mockForbiddenError.message;
  const statusCode = mockForbiddenError.getStatus();

  beforeAll(async () => {
    const module = await assert();
    userLoginService = module.UserLoginService;
    authorizationService = module.AuthorizationService;
  });

  describe('onAfterLogin', () => {
    it('should do nothing if dev login', async () => {
      mockRequest.user = null;
      const result = userLoginService.onAfterLogin(mockMssoUser, mockPayloadToken, mockRequest);
      await expect(result).resolves.not.toThrow();
    });
    it('should throw error if user not found in authorization DB', async () => {
      mockRequest.user = mockMssoSamlUser;
      jest.spyOn(
        authorizationService[`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockNotFoundUser) as any);

      const res = userLoginService.onAfterLogin(mockMssoUser, mockPayloadToken, mockRequest);
      await expect(res).rejects.toThrowError(mockForbiddenError);
    });
    it('should throw error if user not activated', async () => {
      mockRequest.user = mockMssoSamlUser;
      jest.spyOn(
        userLoginService['authService'][`authClientApi`],
        'getUserWithRoles',
      ).mockReturnValue(of(mockDeactivatedUser) as any);

      const res = userLoginService.onAfterLogin(mockMssoUser, mockPayloadToken, mockRequest);
      await expect(res).rejects.toThrowError(mockForbiddenError);
    });
  });

  describe('onLoginRedirect', () => {
    it('should return redirect url to error page', () => {
      const expectedUrl = `/error?statusCode=${statusCode}&message=${message}&isLoggedOut=${shouldLogout}`;
      const url = userLoginService.onLoginRedirect(mockRequest, mockMssoUser, { response: mockForbiddenError.getResponse() });
      expect(url).toContain(expectedUrl);
    });
  });
});
