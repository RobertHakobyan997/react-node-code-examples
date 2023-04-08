import { IAuthUser } from 'ngpd-merceros-authorization-client';
import { EventChannel, EventSource, EventTopic } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export const createFileMetadataEvent = (_id: any, newValue: any, oldValue: any, user: IAuthUser) => ({
  // TODO: create tests on this
  channel: EventChannel.FilesMetadata,
  topic: EventTopic.Update,
  source: EventSource.UI,
  collectionId: _id,
  user: {
    userId: user.globalProfileId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  },
  data: {
    oldValue,
    newValue: newValue,
  },
});
