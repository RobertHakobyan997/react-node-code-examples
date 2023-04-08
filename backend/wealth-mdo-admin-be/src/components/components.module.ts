import { Module } from '@nestjs/common';

import { IS_PROD } from '../utilities/environment.utils';

import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { CommunicationModule } from './communication/communication.module';
import { DevModule } from './dev/dev.module';
import { DocumentsModule } from './documents/documents.module';
import { EventsModule } from './events/events.module';
import { FilesModule } from './files/files.module';
import { FilesMetadataModule } from './files-metadata/files-metadata.module';
import { StaticDataModule } from './static-data/static-data.module';
import { TaskListModule } from './task-list/task-list.module';
import { UserModule } from './user/user.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { LocalizationModule } from './localization/localization.module';
import { HolidayCalendarsModule } from './holiday-calendars/holiday-calendars.module';
import { ContactsModule } from './contacts/contacts.module';
import { RegisteredUsersModule } from './registered-users/registered-users.module';
import { LastChangesUsersModule } from './last-changes-users/last-changes-users.module';
import { RoleCreationPermissionsModule } from './role-creation-permissions/role-creation-permissions.module';
import { ManageRolesPermissionsModule } from './manage-roles-permissions/manage-roles-permissions.module';
import { FilesEventsModule } from './files-events/files-events.module';
import { MessageTemplatesModule } from './message-templates/message-templates.module';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';

@Module({
  imports: [
    AuthenticationModule,
    AuthorizationModule,
    CommunicationModule,
    ...(!IS_PROD ? [ DevModule ] : []),
    DocumentsModule,
    EventsModule,
    FilesModule,
    FilesMetadataModule,
    StaticDataModule,
    TaskListModule,
    UserModule,
    UserSettingsModule,
    LocalizationModule,
    HolidayCalendarsModule,
    ContactsModule,
    RegisteredUsersModule,
    LastChangesUsersModule,
    RoleCreationPermissionsModule,
    ManageRolesPermissionsModule,
    FilesEventsModule,
    MessageTemplatesModule,
    CronJobsModule
  ]
})
export class ComponentsModule {}
