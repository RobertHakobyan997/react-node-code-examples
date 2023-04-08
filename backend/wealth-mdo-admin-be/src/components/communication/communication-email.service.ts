import { Injectable, Logger } from '@nestjs/common';
import { RecipientUser } from 'ngpd-merceros-communication-adapter/dist/model';
import { from, Observable, of } from 'rxjs';
import { Message } from 'ngpd-merceros-communication-adapter';
import { catchError, switchMap } from 'rxjs/operators';

import communicationConfig from '../../config/communication.config';
import { CommunicationUser } from '../../types/communication-user.types';
import { MessageRequest } from '../../types/message-request.types';

import { CommunicationMessagesService } from './communication-messages.service';

@Injectable()
export class CommunicationEmailService {
  private readonly logger = new Logger(CommunicationEmailService.name);

  constructor(
    private readonly communicationMessagesService: CommunicationMessagesService
  ) {
  }

  createAndSendEmail(
    subject: string,
    messageBody: string,
    emails: string[]
  ): Observable<Message> {
    const recipientsUsers = this.createRecipientsForEmailNotification(emails);
    return from(this.communicationMessagesService.createMessage(this.createEmailMessageRequest(subject, messageBody, recipientsUsers)))
      .pipe(
        switchMap(({ id }) => from(this.communicationMessagesService.sendMessage(id))),
        catchError(err => {
          this.logger.error(`${err.message} ${err.stack}`);
          return of(null);
        })
      );
  }

  createEmailMessageRequest(
    subject: string,
    messageBody: string,
    recipientsUsers: RecipientUser[]
  ): MessageRequest {
    return {
      channels  : [ 'email' ],
      documents : [],
      body      : messageBody,
      bodyType  : 'html',
      recipients: {
        users : recipientsUsers,
        groups: [],
      },
      sender        : this.createSenderForMessageRequest(),
      subject,
      creationDate  : new Date(),
      applicationKey: communicationConfig.applicationKey,
    };
  }

  createSenderForMessageRequest(): CommunicationUser {
    const email = communicationConfig.noReplyEmail;
    const firstName = email.split('@')[0];
    return {
      globalProfileId: email,
      firstName,
      lastName       : ' ',
      email,
      phone          : ' ',
    };
  }

  createRecipientsForEmailNotification(notificationIds: string[]) {
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
    const notValidEmails = [];
    const validEmails = [];

    notificationIds.forEach(id => {
      emailRegex.exec(id) ? validEmails.push(id) : notValidEmails.push(id);
    });

    if(notValidEmails.length > 0)
      this.logger.warn(
        'Recepeint emails contains invalid emails',
        'email validation'
      );

    return validEmails.map(item => ({
      email          : item,
      firstName      : item.split('@')[0],
      globalProfileId: item,
    }));
  }
}

