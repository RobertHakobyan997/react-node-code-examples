import { ObjectId } from 'mongodb';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';

export const processingStatuses: Enum[] = [
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af7fd'),
    key    : 'inprogress',
    display: 'In Progress',
    order  : 1,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af7fe'),
    key    : 'failed',
    display: 'Failed',
    order  : 2,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af7ff'),
    key    : 'finishedwitherrors',
    display: 'Finished with Errors',
    order  : 3,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af800'),
    key    : 'success',
    display: 'Success',
    order  : 4,
    hidden : false
  },
  {
    _id    : new ObjectId('609d4c33bfd3901b8c3af802'),
    key    : 'error',
    display: 'Technical Error',
    order  : 5,
    hidden : false
  }
];
