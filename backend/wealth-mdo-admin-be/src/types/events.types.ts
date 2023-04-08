import { JwtUser } from 'ngpd-merceros-wealth-mdo-common-fe/dist/authorization/authorization.type';

export interface EventParams<EventsDataValue> {
  jwtUser: JwtUser;
  topic: string;
  oldValue?: EventsDataValue | object;
  newValue?: EventsDataValue | object;
  entityName?: string;
}

export interface BaseUserEvents {
  userId: string | number;
  creationDate?: Date;
  lastChange?: { createdAt: Date; topic: string };
}
