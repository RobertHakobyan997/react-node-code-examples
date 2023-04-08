import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { from, of, zip } from 'rxjs';
import { catchError, first, mergeMap, switchMap } from 'rxjs/operators';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { CommunicationEmailService } from '../communication/communication-email.service';
import { HolidayCalendarsService } from '../holiday-calendars/holiday-calendars.service';
import { MessageTemplatesService } from '../message-templates/message-templates.service';
import { FilesMetadataService } from '../files-metadata/files-metadata.service';
import { replaceEmailTemplateWithValues } from '../message-templates/pure/message-templates.pure';
import cronJobsConfig from '../../config/cron-jobs.config';

import { getInterval } from './pure/cron-jobs.pure';

@Injectable()
export class CronJobsService {
  constructor(
    private readonly holidayCalendarService: HolidayCalendarsService,
    private readonly communicationEmailService: CommunicationEmailService,
    private readonly messageTemplatesService: MessageTemplatesService,
    private readonly filesMetadataService: FilesMetadataService
  ) {}

  @Cron(getInterval(cronJobsConfig.calendarNotificationInetrval))
  checkOutdatedCalendar() {
    logger.log('Job to check outdates holiday calendarws started');
    let messageTemplate: string;
    zip(
      this.messageTemplatesService.getTemplate('holidayCalendarExpiration', 'email'),
      this.holidayCalendarService.getExpiringHolidayCalendars(),
      this.filesMetadataService.getAllFilesMetadata()
    )
      .pipe(
        first(),
        switchMap(([ { template }, calendars, metadatas ]) => {
          messageTemplate = template;
          return from(
            calendars.filter(calendar =>
              metadatas.some(metadata => metadata.holidayCalendarId === calendar._id)
            )
          );
        }),
        mergeMap(calendar => {
          logger.log('Send notification for ' + calendar.calendarName);
          const body = replaceEmailTemplateWithValues(messageTemplate, { __calendarName__: calendar.calendarName });
          const contacts = calendar.maintenance.contacts;
          return this.communicationEmailService.createAndSendEmail('Update expiring calendar', body, contacts);
      }),
      catchError(err => {
        logger.error(err);
        return of(null);
      })
    )
    .subscribe();
  }
}
