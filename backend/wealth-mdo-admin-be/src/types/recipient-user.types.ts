export interface RecipientUser {
  globalProfileId: number | string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  read?: boolean;
  deleted?: boolean;
}
