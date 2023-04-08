import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ManageRolesPermission, ManageRolesPermissionSchema } from '../../core/schemas/manage-roles-permission.schema';
import { AuthorizationModule } from '../authorization/authorization.module';

import { ManageRolesPermissionsController } from './manage-roles-permissions.controller';
import { ManageRolesPermissionsService } from './manage-roles-permissions.service';

@Module({
  controllers: [ ManageRolesPermissionsController ],
  providers: [ ManageRolesPermissionsService ],
  imports: [
    MongooseModule.forFeature([
      { name: ManageRolesPermission.name, schema: ManageRolesPermissionSchema },
    ]),
    forwardRef(() => AuthorizationModule)
  ],
  exports: [
    MongooseModule.forFeature([
      { name: ManageRolesPermission.name, schema: ManageRolesPermissionSchema },
    ]),
    ManageRolesPermissionsService,
  ],
})
export class ManageRolesPermissionsModule {}
