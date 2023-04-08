export interface Pagination<T> {
  docs: T[];
  page: number;
  limit: number;
  total: number;
}
