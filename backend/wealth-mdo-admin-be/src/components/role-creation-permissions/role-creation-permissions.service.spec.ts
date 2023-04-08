import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { RoleCreationPermissions } from '../../core/schemas/role-creation-permissions.schema';

import { RoleCreationPermissionsService } from './role-creation-permissions.service';

describe('RoleCreationPermissionsService', () => {
  let service: RoleCreationPermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleCreationPermissionsService,
        { provide: getModelToken(RoleCreationPermissions.name), useValue: mockMongooseModel }
      ],
    }).compile();

    service = module.get<RoleCreationPermissionsService>(RoleCreationPermissionsService);
  });

  describe('remove', () => {
    it('should call rolePermissionModel.remove()', () => {
      const roleCreationPermission = { permission: 'create super admin', role: 'superadmin' };
      jest.spyOn(service['rolePermissionModel'], 'deleteOne');
      service.delete(roleCreationPermission);
      expect(service['rolePermissionModel'].deleteOne).toHaveBeenCalledWith(roleCreationPermission);
    });
  });
});
