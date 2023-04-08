import { ObjectId } from 'mongodb';
import { IAuthUser } from 'ngpd-merceros-authorization-client';
import Files from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/files';
import { EventChannel, EventSource, EventStatusTopic } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export const createFileEvent = (id: string, file: Files, user: IAuthUser, hasErrorFile: boolean) => ({
  channel: EventChannel.FileStatus,
  topic: EventStatusTopic[file.state.processingStatus],
  source: EventSource.UI,
  collectionId: new ObjectId(file.filesMetadataId),
  user: {
    userId: user.globalProfileId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  },
  data: {
    fileId: id,
    filesMetadataId: file.filesMetadataId,
    hasErrorFile: hasErrorFile
  },
});
