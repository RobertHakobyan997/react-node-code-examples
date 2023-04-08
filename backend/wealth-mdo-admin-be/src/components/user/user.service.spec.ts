import { mockAuthUser } from '../../../test/data/authorization';
import { mockMssoUser } from '../../../test/data/authentication/msso-saml-user';

import { UserService } from './user.service';
import { assert } from './user.service.spec-setup';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    userService = await assert();
  });

  describe('findByUsername', () => {
    it('should find user by username', async () => {
      jest.spyOn(userService['userModel'], 'findOne').mockReturnValue({
        exec: () => {}
      } as any);

      await userService.findByUsername(mockAuthUser.email);

      expect(userService['userModel'].findOne).toBeCalledWith({ username: mockAuthUser.email });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(userService['userModel'], 'findOne').mockReturnValue({
        exec: () => Promise.resolve(null)
      } as any);

      const result = await userService.findByUsername(mockAuthUser.email);

      expect(result).toEqual(null);
    });
  });

  describe('findById', () => {
    it('should find user by globalprofileid', async () => {
      jest.spyOn(userService['userModel'], 'findOne').mockReturnValue({
        exec: () => {}
      } as any);

      await userService.findById(mockAuthUser.globalProfileId);

      expect(userService['userModel'].findOne).toBeCalledWith({ globalprofileid: mockAuthUser.globalProfileId });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(userService['userModel'], 'findOne').mockReturnValue({
        exec: () => Promise.resolve(null)
      } as any);

      const result = await userService.findById(mockAuthUser.globalProfileId);

      expect(result).toEqual(null);
    });
  });

  describe('findByEmployeeId', () => {
    it('should find user by employeeId', async () => {
      jest.spyOn(userService['userModel'], 'findOne').mockReturnValue({
        exec: () => {}
      } as any);

      await userService.findByEmployeeId(String(mockAuthUser.globalProfileId));

      expect(userService['userModel'].findOne).toBeCalledWith({
        employeeId: String(mockAuthUser.globalProfileId)
      });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(userService['userModel'], 'findOne').mockReturnValue({
        exec: () => Promise.resolve(null)
      } as any);

      const result = await userService.findByEmployeeId(String(mockAuthUser.globalProfileId));

      expect(result).toEqual(null);
    });
  });

  describe('save', () => {
    it('should return user if already exists', async () => {
      jest.spyOn(userService['userModel'], 'exists').mockReturnValue(true as any);
      jest.spyOn(userService['userModel'], 'create');
      jest.spyOn(userService, 'findById');

      await userService.save(mockMssoUser);

      expect(userService['userModel'].exists).toBeCalledWith({ globalprofileid: mockMssoUser.globalprofileid });
      expect(userService['userModel'].create).toBeCalledTimes(0);
      expect(userService.findById).toBeCalledWith(mockMssoUser.globalprofileid);
    });

    it('should create user if doesn\'t exist', async () => {
      jest.spyOn(userService['userModel'], 'exists').mockReturnValue(false as any);
      jest.spyOn(userService['userModel'], 'create');

      await userService.save(mockMssoUser);

      expect(userService['userModel'].create).toBeCalledWith(mockMssoUser);
    });
  });

  describe('updateUser', () => {
    it('should update and return user if found', async () => {
      jest.spyOn(userService['userModel'], 'findOneAndUpdate').mockReturnValue({
        exec: () => {}
      } as any);

      await userService.updateUser(String(mockAuthUser.globalProfileId), mockAuthUser);

      expect(userService['userModel'].findOneAndUpdate).toHaveBeenCalledWith({
        employeeId: String(mockAuthUser.globalProfileId)
      }, mockAuthUser, { new: true });
    });
  });

  describe('deleteUser', () => {
    it('should delete user and return success response if user found', async () => {
      jest.spyOn(userService['userModel'], 'deleteOne').mockReturnValue({
        exec: () => {}
      } as any);

      await userService.deleteUser(String(mockAuthUser.globalProfileId));

      expect(userService['userModel'].deleteOne).toHaveBeenCalledWith({
        employeeId: String(mockAuthUser.globalProfileId)
      });
    });
  });
});
