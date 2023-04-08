import { ObjectId } from 'mongodb';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';

export const testSuppliers: Suppliers[] = [
  {
    _id    : new ObjectId(),
    key    : 'bnp',
    display: 'BNP',
    order  : 1,
    hidden : false,
  },
  {
    _id    : new ObjectId(),
    key    : 'mdo',
    display: 'MDO',
    order  : 2,
    hidden : false,
  },
  {
    _id    : new ObjectId(),
    key    : 'state-street-fund-accounting',
    display: 'State Street Fund Accounting',
    order  : 3,
    hidden : false,
  },
  {
    _id    : new ObjectId(),
    key    : 'state-street-transfer-agency',
    display: 'State Street Transfer Agency',
    order  : 4,
    hidden : false,
  },
  {
    _id    : new ObjectId(),
    key    : 'state-street-global-advisors',
    display: 'State Street Global Advisors',
    order  : 5,
    hidden : false,
  },
  {
    _id    : new ObjectId(),
    key    : 'state-street-international-services',
    display: 'State Street International Services',
    order  : 6,
    hidden : false,
  },
];
