import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { ManageRolesPermission, ManageRolesPermissionDocument } from '../../core/schemas/manage-roles-permission.schema';

import { ManageRolesPermissionUpdateRequest } from './types/ManageRolesPermission.type';

@Injectable()
export class ManageRolesPermissionsService {
    constructor(
        @InjectModel(ManageRolesPermission.name) private readonly manageRolesPermissionModel: Model<ManageRolesPermissionDocument>
    ) {}

    async create(data: ManageRolesPermission) {
      const existedEntry = await this.findOne({ permission: data.permission });
      if (existedEntry) throw new BadRequestException(`Feature flag for ${data.permission} permission already exist`);
      return this.manageRolesPermissionModel.create(data);
    }

    findAll(filter: FilterQuery<ManageRolesPermissionDocument> = {}, sort: string | any = {}, options: any = {}) {
      return this.manageRolesPermissionModel
        .find(filter, {}, options)
        .sort(sort)
        .exec();
    }

    findOne(filter: FilterQuery<ManageRolesPermissionDocument> = {}, projection: any = {}, options: any = {}) {
      return this.manageRolesPermissionModel.findOne(filter, projection, options).exec();
    }

    updateById(id: string, data: any) {
      return this.manageRolesPermissionModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    delete(id: string) {
      return this.manageRolesPermissionModel.findByIdAndDelete(id).exec();
    }

    async update(body: ManageRolesPermissionUpdateRequest[]) {
      await this.manageRolesPermissionModel.bulkWrite(body.map(({ permission, roles }) => ({
        updateOne: {
          filter: { permission },
          update: { $set: { roles } },
        }
      })));
      return this.findAll({
        permission: {
          $in: body.map(({ permission }) => permission)
        }
      });
    }
}
