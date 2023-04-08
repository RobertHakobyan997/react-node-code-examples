import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { ManageRolesPermission } from '../../core/schemas/manage-roles-permission.schema';

import { ManageRolesPermissionsService } from './manage-roles-permissions.service';

describe('ManageRolesPermissionsService', () => {
  let service: ManageRolesPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManageRolesPermissionsService,
        { provide: getModelToken(ManageRolesPermission.name), useValue: mockMongooseModel }
      ],
    }).compile();

    service = module.get<ManageRolesPermissionsService>(ManageRolesPermissionsService);
  });

  describe('create', () => {
    it('should call manageRolesPermissionModel.create()', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      jest.spyOn(service['manageRolesPermissionModel'], 'create');

      await service.create({} as any);
      expect(service['manageRolesPermissionModel'].create).toHaveBeenCalledWith({});
    });

    it('should throw an error', async () => {
      const existedEntry = { permission: 'create super admin', roles: [ 'superadmin' ] };
      jest.spyOn(service, 'findOne').mockResolvedValue(existedEntry as any);

      await service.create({} as any).catch(er => expect(er).not.toBeNull());
    });
  });

  describe('findAll', () => {
    it('should call manageRolesPermissionModel.find()', async () => {
      jest.spyOn(service['manageRolesPermissionModel'], 'find').mockReturnValue({ sort: () => ({ exec: () => ({}) }) } as any);

      await service.findAll();
      expect(service['manageRolesPermissionModel'].find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call rolePermissionModel.findOne()', async () => {
      jest.spyOn(service['manageRolesPermissionModel'], 'findOne').mockReturnValue({ exec: () => ({}) } as any);

      await service.findOne();
      expect(service['manageRolesPermissionModel'].findOne).toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    it('should call manageRolesPermissionModel.findByIdAndUpdate()', () => {
      const entry = { permission: 'create super admin', roles: [ 'superadmin' ] };
      jest.spyOn(service['manageRolesPermissionModel'], 'findByIdAndUpdate').mockReturnValue({ exec: () => ({}) } as any);
      service.updateById('123', entry as any);
      expect(service['manageRolesPermissionModel'].findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should call manageRolesPermissionModel.findByIdAndDelete()', () => {
      jest.spyOn(service['manageRolesPermissionModel'], 'findByIdAndDelete').mockReturnValue({ exec: () => ({}) } as any);
      service.delete('123');
      expect(service['manageRolesPermissionModel'].findByIdAndDelete).toHaveBeenCalledWith('123');
    });
  });

  describe('update', () => {
    it('should call bulkWrite', async () => {
      jest.spyOn(service['manageRolesPermissionModel'], 'bulkWrite');
      jest.spyOn(service, 'findAll');
      await service.update([ { permission: 'resend file', roles: [ 'superadmin' ] } ]);
      expect(service['manageRolesPermissionModel'].bulkWrite).toBeCalledWith([
        {
          updateOne: {
            filter: { permission: 'resend file' },
            update: { $set: { roles: [ 'superadmin' ] } },
          }
        }
      ]);
      expect(service.findAll).toBeCalled();
    });
  });
});
