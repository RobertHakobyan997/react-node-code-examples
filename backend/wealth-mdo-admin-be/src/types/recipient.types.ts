import { RecipientUser } from './recipient-user.types';
import { RecipientGroup } from './recipient-group.types';

export interface Recipient {
  users?: RecipientUser[];
  groups?: RecipientGroup[];
}
