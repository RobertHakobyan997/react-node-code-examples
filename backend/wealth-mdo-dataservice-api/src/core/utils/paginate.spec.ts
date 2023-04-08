import {
  testFilesMetadata,
  testPaginateFilesMetadata,
} from '../../../test/data/files-metadata/test-files-metadata.const';

import * as pagination from './paginate';

describe('customPagination', () => {

  describe('paginate()', () => {
    const paginationParams = { limit: 2, offset: 0 };

    it('should return a paginated data according to provided pagination params', async () => {
      jest.spyOn(pagination, 'paginate');
      const { docs } = testPaginateFilesMetadata;

      const res = pagination.paginate(testFilesMetadata, paginationParams);
      expect(res).toEqual({ ...testPaginateFilesMetadata, docs: docs.slice(0, 2) });
    });
    it('should return a default pagination object if data is empty or was not provided', async () => {
      jest.spyOn(pagination, 'paginate');

      const res = pagination.paginate([], paginationParams);
      expect(res).toEqual(pagination.getInitialPagination(paginationParams));
    });
  });
});
