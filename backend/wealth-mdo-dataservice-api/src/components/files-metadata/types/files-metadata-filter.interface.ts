export interface FilesMetadataFilter {
  statuses: string[];
  field: string;
  sortOrder: string;
  limit: number;
  offset: number;
  received: string;
  isEnabled: string;
}
