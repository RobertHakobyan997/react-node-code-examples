import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { mockMongooseModel } from '../../../test/mocks/mock-mongoose.model';
import { User } from '../../core/schemas/user.schema';

import { UserService } from './user.service';

export const assert = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      { provide: getModelToken(User.name), useValue: mockMongooseModel }
    ],
  }).compile();

  return module.get<UserService>(UserService);
};
