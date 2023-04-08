import { Status } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export interface FilesStatus {
  [Status.all]: number;
  [Status.success]: number;
  [Status.failed]: number;
  [Status.inProgress]: number;
  [Status.technicalError]: number;
  [Status.finishedWithErrors]: number;
  [Status.waitingToBeProcessed]: number;
}
