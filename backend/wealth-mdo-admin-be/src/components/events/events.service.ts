import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { ObjectId } from 'mongodb';
import { SiemEvent, Logger } from 'ngpd-merceros-logger-be';
import { from, Observable } from 'rxjs';

import { BaseUserEvents } from '../../types/events.types';
import { UserEvents, UserEventsDocument } from '../../core/schemas/user-events.schema';
import { mergeMemo } from '../../core/utils/lodash';
import { baseUsersEventsAggregation } from '../last-changes-users/aggregations/base-users-events';

import { mapUserEvents, getLogEventTopic } from './pure/events.pure';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectModel(UserEvents.name) private readonly model: PaginateModel<UserEventsDocument>,
    ) {
  }

  find() {
    return this.model.find().exec();
  }

  create(events: any) {
    return this.model.insertMany(events);
  }

  async update(id: string, events: UserEvents) {
    const event = await this.model.findById(id).exec();
    return this.model.findByIdAndUpdate(id, mergeMemo(event, events)).exec();
  }

  async getUserEvents(employeeId: string, field: string, sortOrder: string, offset: number, limit: number) {
    const events = await this.model.paginate(
      {
        '$or': [
          {
            'data.newValue.user.globalProfileId': employeeId,
          },
          {
            'data.oldValue.user.globalProfileId': employeeId,
          } ],
      },
      {
        sort: { [field]: sortOrder },
        offset,
        limit,
        lean: true,
      },
    );
    events.docs = mapUserEvents(events.docs) as any;
    return events;
  }

  getBaseUsersEvents(): Observable<BaseUserEvents[]> {
    const baseUsersEvents = this.model.aggregate(baseUsersEventsAggregation());
    return from(baseUsersEvents);
  }

  /**
   * @private
   * @description Below event methods for EventEmitterModule
   */

  @OnEvent('createEvent', { async: true })
  private onCreateEvent({ context, siem, data, userId, entityName = '' }: any) {
    const author = data?.user?.user;
    const eventData = JSON.stringify(data?.data ?? '');
    const eventType = `${entityName} ${getLogEventTopic(data.topic)}`.trim();
    this.logger.log(
      `MDO user ${author?.email ?? userId} created "${eventType}" event with following details: ${eventData}`,
      context,
      { siem }
    );
    return this.model.create({
      ...data,
      channel     : 'BE',
      source      : 'MDO',
      collectionId: author?._id,
    });
  }

  @OnEvent('onLogout', { async: true })
  private onLogout({ context, data }: any) {
    this.logger.log(
      `MDO user logged out from UI: email ${data.user.email} | employeeId ${data.user.employeeId} | authorization db id ${data.user._id}`,
      context,
      { siem: SiemEvent.Logout },
    );
    return this.model.create({
      ...data,
      channel     : 'BE',
      source      : 'MDO',
      collectionId: new ObjectId(),
    });
  }

  @OnEvent('system.*', { async: true })
  private onSystemEvent({ context, data }: any) {
    this.logger.log(`System event`, context, { siem: 'System' });
    return this.model.create({
      ...data,
      channel     : 'BE',
      source      : 'MDO',
      collectionId: new ObjectId(),
    });
  }
}
