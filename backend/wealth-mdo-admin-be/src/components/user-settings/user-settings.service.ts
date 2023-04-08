import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { PagesPermissions, PagesPermissionsDocument } from '../../core/schemas/pages-permissions.schema';
import { RoleCreationPermissions, RoleCreationPermissionsDocument } from '../../core/schemas/role-creation-permissions.schema';
import { QuickFilter, QuickFilterDocument } from '../../core/schemas/quick-filter.schema';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectModel(QuickFilter.name) private readonly model: Model<QuickFilterDocument>,
    @InjectModel(PagesPermissions.name) private readonly pagesPermissionsModel: Model<PagesPermissionsDocument>,
    @InjectModel(RoleCreationPermissions.name) private readonly rolePermissionModel: Model<RoleCreationPermissionsDocument>
  ) {}

  async getUserSettings() {
    const [ quickFilters ] = await Promise.all([
      this.getQuickFilters(),
    ]);
    return { quickFilters };
  }

  getQuickFilters() {
    logger.log('Get Quick Date Filters');
    return this.model.find().exec();
  }

  getPagesPermissions() {
    logger.log('Get pages permissions');
    return this.pagesPermissionsModel.find().exec();
  }

  getRoleCreationPermissions() {
    logger.log('Get role creation permissions');
    return this.rolePermissionModel.find().exec();
  }
}
