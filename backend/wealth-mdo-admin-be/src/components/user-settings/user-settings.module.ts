import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PagesPermissions, PagesPermissionsSchema } from '../../core/schemas/pages-permissions.schema';
import { RoleCreationPermissions, RoleCreationPermissionsSchema } from '../../core/schemas/role-creation-permissions.schema';
import { QuickFilter, QuickFilterSchema } from '../../core/schemas/quick-filter.schema';

import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  controllers: [ UserSettingsController ],
  imports: [
    MongooseModule.forFeature([
      { name: QuickFilter.name, schema: QuickFilterSchema },
      { name: PagesPermissions.name, schema: PagesPermissionsSchema },
      { name: RoleCreationPermissions.name, schema: RoleCreationPermissionsSchema },
    ]),
  ],
  providers: [
    UserSettingsService,
  ],
  exports: [
    MongooseModule.forFeature([
      { name: QuickFilter.name, schema: QuickFilterSchema },
      { name: PagesPermissions.name, schema: PagesPermissionsSchema },
      { name: RoleCreationPermissions.name, schema: RoleCreationPermissionsSchema },
    ]),
    UserSettingsService,
  ],
})
export class UserSettingsModule {
}
