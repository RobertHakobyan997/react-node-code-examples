import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { provideMockEventsService } from '../../../test/mocks/mock-events-service';
import { provideMockAuthorizationService } from '../../../test/mocks/mock-authorization-service';
import { mockAuthUser } from '../../../test/data/authorization';

import { LastChangesUsersService } from './last-changes-users.service';
import { UserStatus } from './constants/user-status.enum';

describe('LastChangesUsersService', () => {
  let service: LastChangesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ LastChangesUsersService, provideMockEventsService(), provideMockAuthorizationService() ],
    }).compile();

    service = module.get<LastChangesUsersService>(LastChangesUsersService);
  });

  describe('getUsersWithRolesAndBaseEvents', () => {
    it('should base events', () => {
      jest.spyOn(service['authorizationService'], 'getUsersWithRoles')
      .mockReturnValue(
        of({
          user: mockAuthUser,
          roles: [],
          isLastSecurityAdmin: true,
        })
      );
      jest.spyOn(service['eventsService'], 'getBaseUsersEvents')
      .mockReturnValue(
        of([
          {
            userId: mockAuthUser.globalProfileId,
            creationDate: new Date(2021,1,1),
            lastChange: { createdAt:  new Date(2021,2,1), topic: 'modified' }
          }
        ])
      );

      service.getUsersWithRolesAndBaseEvents().subscribe(res => {
        expect(res).toEqual([
          {
            firstName: mockAuthUser.firstName,
            lastName: mockAuthUser.lastName,
            email: mockAuthUser.email,
            status: mockAuthUser.activated ? UserStatus.active : UserStatus.inactive,
            role: '',
            creationDate: new Date(2021,1,1).toISOString(),
            lastChange: `${new Date(2021,2,1).toISOString()}, Modified`
          }
        ]);
      });
    });
  });
});
