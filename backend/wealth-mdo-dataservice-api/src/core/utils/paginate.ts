import { ceil, take, drop, isEmpty, isNumber, size } from 'lodash';
import { PaginateResult } from 'mongoose';

export interface PaginateOptions {
  limit: number;
  offset: number;
}

export const getInitialPagination = (options: PaginateOptions) => {
  const { limit, offset } = options;

  return {
    docs         : [],
    hasNextPage  : false,
    hasPrevPage  : false,
    nextPage     : null,
    limit,
    offset,
    page         : 1,
    prevPage     : null,
    totalDocs    : 0,
    totalPages   : 1,
    pagingCounter: 0,
  };
};

const getCurrentPage = ({ limit, offset }: PaginateOptions) => ceil((offset + 1) / limit);
const getPrevPage = (currentPage: number) => currentPage > 1 ? currentPage - 1 : null;
const getNextPage = (currentPage: number, totalPages: number) => currentPage < totalPages ? currentPage + 1 : null;
const getPagingCounter = (currentPage: number, limit: number) => limit === 0 ? 1 : (currentPage - 1) * limit + 1;

export function paginate<DataType>(data: DataType[], options: PaginateOptions): PaginateResult<DataType>{
  const { limit, offset } = options;

  const totalDocs = size(data);
  const totalPages = ceil(totalDocs / limit);
  const page = getCurrentPage(options);
  const prevPage = getPrevPage(page);
  const hasPrevPage = isNumber(prevPage);
  const nextPage = getNextPage(page, totalPages);
  const hasNextPage = isNumber(nextPage);
  const pagingCounter = getPagingCounter(page, limit);
  const docs = take(drop(data, offset), limit);

  return isEmpty(docs) ? getInitialPagination(options) : {
    docs,
    hasPrevPage,
    hasNextPage,
    limit,
    offset,
    page,
    prevPage,
    nextPage,
    totalDocs,
    totalPages,
    pagingCounter
  };
}
