import { MssoSamlUser, MssoUser } from 'ngpd-merceros-authentication-be-components';

export const mockMssoSamlUser: MssoSamlUser = {
    globalprofileid: 12345,
    identityProvider: '',
    email: '',
    nameID: '12345',
    sessionIndex: '',
};

export const mockMssoUser: MssoUser = {
    ...mockMssoSamlUser,
    username: 'mock.user@.mmc.com'
};
