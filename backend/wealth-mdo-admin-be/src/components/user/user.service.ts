import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MssoUser, UserService as AuthenticationUserService } from 'ngpd-merceros-authentication-be-components';

import { User, UserDocument } from '../../core/schemas/user.schema';

@Injectable()
export class UserService implements AuthenticationUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
  }

  async findByUsername(username: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({ username }).exec();

    if (result)
      return result.toObject<UserDocument>({ getters: true });

    return null;
  }

  async findById(id: number): Promise<UserDocument> {
    const result = await this.userModel.findOne({ globalprofileid: id }).exec();

    if (result)
      return result.toObject<UserDocument>({ getters: true });

    return null;
  }

  async findByEmployeeId(employeeId: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({ employeeId }).exec();

    if (result)
      return result.toObject<UserDocument>({ getters: true });

    return null;
  }

  async save(user: MssoUser): Promise<UserDocument> {
    const exists = await this.userModel.exists({ globalprofileid: user.globalprofileid });

    if (!exists)
      await this.userModel.create(user);

    return this.findById(user.globalprofileid);
  }

  updateUser(employeeId: string, user: Partial<MssoUser>): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(
      { employeeId },
      user,
      { new: true }
    ).exec();
  }

  deleteUser(employeeId: string) {
    return this.userModel.deleteOne({ employeeId }).exec();
  }
}
