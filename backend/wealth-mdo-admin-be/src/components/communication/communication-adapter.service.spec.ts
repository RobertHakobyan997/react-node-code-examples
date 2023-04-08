import {
  mockMessagesApi,
  mockNotificationsApi,
} from '../../../test/mocks/mock-communication-adapter.const';

import { CommunicationAdapterService } from './communication-adapter.service';

describe('CommunicationAdapterService', () => {
  let communicationAdapterService: CommunicationAdapterService;
  const api = require('ngpd-merceros-communication-adapter/dist').API;
  api.getNotificationsApi = () => mockNotificationsApi;
  api.getMessagesApi = () => mockMessagesApi;

  beforeAll(() => {
    communicationAdapterService = new CommunicationAdapterService();
  });

  describe('getNotificationsAdapter', () => {
    it('should return notifications adapter', () => {
      expect(communicationAdapterService.getNotificationsAdapter()).toEqual(
        mockNotificationsApi
      );
    });
  });

  describe('getMessagesAdapter', () => {
    it('should return messages adapter', () => {
      expect(communicationAdapterService.getMessagesAdapter()).toEqual(
        mockMessagesApi
      );
    });
  });
});
