import { AuthenticationModule } from 'ngpd-merceros-authentication-be-components';

import authenticationConfig from '../authentication.config';
import { UserService } from '../../components/user/user.service';
import { UserModule } from '../../components/user/user.module';
import { UserRegistrationService } from '../../components/user/user-registration.service';
import { UserForgotPasswordService } from '../../components/user/user-forgot-password.service';
import { UserLoginService } from '../../components/user/user-login.service';
import { AuthorizationModule } from '../../components/authorization/authorization.module';

export default AuthenticationModule.forRoot(
  authenticationConfig,
  [ UserService, UserRegistrationService, UserForgotPasswordService, UserLoginService ],
  [ UserModule, AuthorizationModule ]
);
