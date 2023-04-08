import { AUTH_DATA } from './authorization.const';

export const mockAuthUserCriteria = {
  appId: AUTH_DATA.APP_NAME,
  email: 'test@test.com',
  includeRoles: true,
  name: 'testUser',
  permissionsOr: [ '602be292bbae1749a8ca4292', '602be292bbae1749a8ca4292' ],
  permissionsAnd: [ '602be292bbae1749a8ca4292', '602be292bbae1749a8ca4292' ],
  activated: true,
  skip: '0',
  limit: '1',
};
