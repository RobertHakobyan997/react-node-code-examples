import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { RequestService } from '../../core/request/request.service';
import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { provideMockAuthorizationService } from '../../../test/mocks/mock-authorization-service';
import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { CommunicationEmailService } from '../communication/communication-email.service';
import { CommunicationMessagesService } from '../communication/communication-messages.service';
import { CommunicationAdapterService } from '../communication/communication-adapter.service';
import { MessageTemplatesService } from '../message-templates/message-templates.service';
import { FilesMetadataService } from '../files-metadata/files-metadata.service';
import { testMessageTemplate } from '../../../test/data/message-templates/message-templates.const';
import { testHolidayCalendarsResponse } from '../../../test/data/holiday-calendars/holiday-calendars.consts';
import { testFileMetadatasResponse } from '../../../test/data/file-metadata/file-metadata.const';

import { CronJobsService } from './cron-jobs.service';

describe('CronJobsService', () => {
  let service: CronJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ScheduleModule.forRoot(),
      ],
      providers: [
        CronJobsService,
        HolidayCalendarsService,
        RequestService,
        CommunicationEmailService,
        CommunicationMessagesService,
        CommunicationAdapterService,
        MessageTemplatesService,
        FilesMetadataService,
        provideMockHttpService(),
        provideMockAuthorizationService()
      ],
    }).compile();

    service = module.get<CronJobsService>(CronJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkOutdatedCalendar', () => {
    beforeEach(() => {
      jest.spyOn(service['messageTemplatesService'], 'getTemplate').mockReturnValue(of(testMessageTemplate));
      jest.spyOn(service['holidayCalendarService'], 'getExpiringHolidayCalendars').mockReturnValue(of(testHolidayCalendarsResponse));
      jest.spyOn(service['communicationEmailService'], 'createAndSendEmail').mockReturnValue(of(null));
    });

    it('should send messages', () => {
      jest.spyOn(service['filesMetadataService'], 'getAllFilesMetadata').mockReturnValue(of(testFileMetadatasResponse));

      service.checkOutdatedCalendar();

      expect(service['messageTemplatesService'].getTemplate).toBeCalled();
      expect(service['holidayCalendarService'].getExpiringHolidayCalendars).toBeCalled();
      expect(service['filesMetadataService'].getAllFilesMetadata).toBeCalled();
      expect(service['communicationEmailService'].createAndSendEmail).toBeCalled();
    });
    it('shouldn\'t send messages', () => {
      jest.spyOn(service['filesMetadataService'], 'getAllFilesMetadata').mockReturnValue(of([]));

      service.checkOutdatedCalendar();

      expect(service['messageTemplatesService'].getTemplate).toBeCalled();
      expect(service['holidayCalendarService'].getExpiringHolidayCalendars).toBeCalled();
      expect(service['filesMetadataService'].getAllFilesMetadata).toBeCalled();
      expect(service['communicationEmailService'].createAndSendEmail).toBeCalledTimes(0);
    });
  });
});
