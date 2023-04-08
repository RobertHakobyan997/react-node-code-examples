import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { plainToClass } from 'class-transformer';
import FileDirectionsModel from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/file-directions';

export const fileDirectionsRaw = [
  {
    _id    : '609d4c33bfd3901b8c3af7f9',
    key    : 'inbound',
    display: 'Inbound',
    order  : 1,
    hidden : false
  },
  {
    _id    : '609d4c33bfd3901b8c3af7fa',
    key    : 'outbound',
    display: 'Outbound',
    order  : 2,
    hidden : false
  },
  {
    _id    : '609d4c33bfd3901b8c3af7fb',
    key    : 'error',
    display: 'Error',
    order  : 3,
    hidden : false
  },
];

export const fileDirections: Enum[] = plainToClass(FileDirectionsModel, fileDirectionsRaw);
