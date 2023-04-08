import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { RequestService } from '../../core/request/request.service';
import { provideMockHttpService } from '../../../test/mocks/mock-http-service.const';
import { testScheduleHistoryRequest } from '../../../test/data/files-events/files-events.const';

import { FilesEventsService } from './files-events.service';

describe('FilesEventsService', () => {
  let service: FilesEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesEventsService,
        RequestService,
        provideMockHttpService(),
      ],
    }).compile();

    service = module.get<FilesEventsService>(FilesEventsService);
  });

  describe('getScheduleHistory', () => {
    it('should call Post request', () => {
      const response = {
        date: new Date(2021, 1, 1),
        fileReceived: 'Yes',
        fileStatus: 'onTime'
      };

      jest.spyOn(service['request'], 'post').mockReturnValue(
        of({ data: [ response ] }) as any
      );
      const scheduleHistory = service.getScheduleHistory(testScheduleHistoryRequest);
      scheduleHistory.subscribe(res => expect(res).toEqual({ data: [ response ] }));
    });
  });
});
