import { isEqual, transform, set, toPairs, startCase } from 'lodash';
import { IAuthData } from 'ngpd-merceros-wealth-mdo-common-be/dist/authentication/authentication.type';

import { UserEventsDocument } from '../../../core/schemas/user-events.schema';
import { EVENT_TYPE } from '../../../constants/events.const';

export function formatObjToString(obj){
  return toPairs(obj).map(value => value.join(': ')).join(', ');
}

export function compareUserEventsData({ user, roles }: IAuthData, base: IAuthData) {
  const changes = {
    oldValue: '',
    newValue: ''
  };
  const [ role ] = roles;
  const [ baseRole ] = base.roles;

  transform(user, (result, value, key) => {
    if (!isEqual(value, base.user[key])) {
      set(changes, [ 'oldValue', startCase(key) ], value);
      set(changes, [ 'newValue', startCase(key) ], base.user[key]);
    }
  });
  if (role.name !== baseRole.name) {
    set(changes, 'oldValue.Role', startCase(role.name));
    set(changes, 'newValue.Role', startCase(baseRole.name));
  }

  return changes;
}

export function mapUserEventData({ user, topic, createdAt }: UserEventsDocument, oldValue = '--', newValue = '--') {
  return {
    user : `${user.user.firstName} ${user.user.lastName}`,
    role : startCase(user.roles[0].name),
    topic: startCase(topic),
    createdAt,
    oldValue,
    newValue,
  };
}

export function mapUserEvents(events: UserEventsDocument[]) {
  return events.map(event => {
    switch (event.topic) {
      case EVENT_TYPE.modified: {
        const changed = compareUserEventsData(event.data.oldValue, event.data.newValue);
        return mapUserEventData(event, formatObjToString(changed.oldValue), formatObjToString(changed.newValue));
      }
      case EVENT_TYPE.deactivated:
        return mapUserEventData(event, `Status: Active`, 'Status: Inactive');
      case EVENT_TYPE.activated:
        return mapUserEventData(event, `Status: Inactive`, 'Status: Active');
      case EVENT_TYPE.created:
      case EVENT_TYPE.deleted:
        return mapUserEventData(event);
    }
  });
}

export function getLogEventTopic(type: string) {
  switch (type) {
    case EVENT_TYPE.created:
      return 'creation';
    case EVENT_TYPE.modified:
      return 'modification';
    case EVENT_TYPE.deactivated:
      return 'deactivation';
    case EVENT_TYPE.activated:
      return 'activation';
    case EVENT_TYPE.deleted:
      return 'deletion';
  }
  return type;
}
