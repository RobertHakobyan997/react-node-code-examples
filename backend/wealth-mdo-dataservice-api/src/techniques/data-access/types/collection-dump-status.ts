export interface CollectionDumpStatus {
  name: string;
  status: 'dumped' | 'ignored';
  body?: any;
}
