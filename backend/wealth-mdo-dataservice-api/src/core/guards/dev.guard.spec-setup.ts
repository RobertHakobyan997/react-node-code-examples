import { Test } from '@nestjs/testing';

import { DevGuard } from './dev.guard';

export const assert = async () => {
  const module = await Test.createTestingModule({
    providers: [
      DevGuard,
    ],
  }).compile();

  return module.get<DevGuard>(DevGuard);
};
