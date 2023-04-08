import { JwtUser } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/authorization.type';

export const mockAuthUser = {
  _id: '6020e66d9fb8c58e72335bd5',
  appId: '6020e66erjfb8c58e72335bd5',
  email: 'test123@mail.com',
  firstName: 'first name',
  lastName: 'last name',
  globalProfileId: 1238953298,
  phone: '1589324095533',
  title: 'user',
  roles: [ 'admin', 'user' ],
  groups: [ 'admins', 'users' ],
  claims: [ 'role' ],
  activated: true,
};

export const mockDBUser = {
  _id: '60afa232dae6f545b0ac7253',
  username: 'user@mail.com',
  firstName: 'name',
  lastName: 'last name',
  globalprofileid: 1248953298,
  country: '',
  language: '',
  email: 'user@mail.com'
};

export const mockJwtUser = {
  globalprofileid: 1248953298,
  employeeId: '1234567',
  correlationId: '0BtMYiaUDSgg1rukTasRRPiO',
  username: 'user@mail.com',
  isWhitelistLogin: true,
  iat: 1622208206,
  exp: 1622208326,
} as JwtUser;
