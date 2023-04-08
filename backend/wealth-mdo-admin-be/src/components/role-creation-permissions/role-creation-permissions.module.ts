import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleCreationPermissions, RoleCreationPermissionsSchema } from '../../core/schemas/role-creation-permissions.schema';

import { RoleCreationPermissionsController } from './role-creation-permissions.controller';
import { RoleCreationPermissionsService } from './role-creation-permissions.service';

@Module({
  controllers: [ RoleCreationPermissionsController ],
  providers: [ RoleCreationPermissionsService ],
  imports: [
    MongooseModule.forFeature([
      { name: RoleCreationPermissions.name, schema: RoleCreationPermissionsSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: RoleCreationPermissions.name, schema: RoleCreationPermissionsSchema },
    ]),
  ],
})
export class RoleCreationPermissionsModule {}
