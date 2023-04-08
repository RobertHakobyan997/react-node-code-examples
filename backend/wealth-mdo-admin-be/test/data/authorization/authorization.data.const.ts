import { IAuthData, IAuthUser } from '../../../src/types/authorization.types';
import { mockAuthUser, mockAuthRole } from '.';

export const mockAuthData: IAuthData = {
  user: mockAuthUser,
  roles: [ mockAuthRole, mockAuthRole ],
};

export const matchingField = 'matchingField';

const userWithSearchedMail: IAuthUser = {
    ...mockAuthUser,
    email: matchingField,
};

const userWithSearchedFirsname: IAuthUser = {
    ...mockAuthUser,
    firstName: matchingField
};

export const mockAuthDataArray: IAuthData[] = [
  { ...mockAuthData },
  {
    ...mockAuthData,
    user: userWithSearchedMail
  },
  {
    ...mockAuthData,
    user: userWithSearchedFirsname
  }
];
