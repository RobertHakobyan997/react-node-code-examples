import { HttpService } from '@nestjs/common';

export class MockHttpService {
  get = () => null;
  post = () => null;
  put = () => null;
  delete = () => null;
  request = () => null;
}

export function provideMockHttpService() {
  return {
    provide : HttpService,
    useClass: MockHttpService,
  };
}
