import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoleCreationPermissions, RoleCreationPermissionsDocument } from '../../core/schemas/role-creation-permissions.schema';

import { RoleCreationPermission } from './types/RoleCreationPermission.type';

@Injectable()
export class RoleCreationPermissionsService {
    constructor(
        @InjectModel(RoleCreationPermissions.name) private readonly rolePermissionModel: Model<RoleCreationPermissionsDocument>
    ) {}

    delete(roleCreationPermission: RoleCreationPermission) {
      return this.rolePermissionModel.deleteOne(roleCreationPermission);
    }
}
