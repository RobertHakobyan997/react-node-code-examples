import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../core/schemas/user.schema';

import { UserService } from './user.service';
import { UserRegistrationService } from './user-registration.service';
import { UserForgotPasswordService } from './user-forgot-password.service';

@Module({
  imports  : [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [
    UserService,
    UserRegistrationService,
    UserForgotPasswordService
  ],
  exports  : [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    UserService,
    UserRegistrationService,
    UserForgotPasswordService
  ]
})
export class UserModule {
}
