import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { QuickFilter } from '../../core/schemas/quick-filter.schema';
import { PagesPermissions } from '../../core/schemas/pages-permissions.schema';
import { RoleCreationPermissions } from '../../core/schemas/role-creation-permissions.schema';

import { UserSettingsService } from './user-settings.service';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserSettingsService,
      { provide: getModelToken(QuickFilter.name), useValue: mockMongooseModel },
      { provide: getModelToken(PagesPermissions.name), useValue: mockMongooseModel },
      { provide: getModelToken(RoleCreationPermissions.name), useValue: mockMongooseModel },
    ],
  }).compile();

  return module.get<UserSettingsService>(UserSettingsService);
};
