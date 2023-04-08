import { RecipientUser } from './recipient-user.types';

export interface RecipientGroup {
  globalProfileId: number | string;
  name: string;
  users: RecipientUser[];
}
