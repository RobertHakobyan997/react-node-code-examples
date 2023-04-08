import { JwtService } from '@nestjs/jwt';

export class mockJwtService {
  sign = () => null;
  signAsync = () => null;
  verify = () => null;
  verifyAsync = () => null;
  decode = () => null;
}

export function provideMockJwtService() {
  return {
    provide: JwtService,
    useClass: mockJwtService,
  };
}
