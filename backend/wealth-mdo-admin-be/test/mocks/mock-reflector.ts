import { Reflector } from '@nestjs/core';

export class mockReflector {
  get = () => null;
  getAll = () => null;
  getAllAndMerge = () => null;
  getAllAndOverride = () => null;
}

export function provideMockReflector() {
  return {
    provide: Reflector,
    useClass: mockReflector,
  };
}
