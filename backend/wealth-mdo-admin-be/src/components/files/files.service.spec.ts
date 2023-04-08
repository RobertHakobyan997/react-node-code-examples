import { of } from 'rxjs';

import { fileFilterRequest, testFile } from '../../../test/data/documents/test-file.const';

import { assert } from './files.service.spec-setup';
import { FilesService } from './files.service';

describe('Files service: ', () => {
  let filesService: FilesService;

  beforeAll(async () => {
    filesService = await assert();
  });

  describe('getFiles', () => {
    it('should return all files from database', async () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of(testFile),
      );

      const files = filesService.getFiles();
      files.subscribe(res => expect(res).toEqual(testFile));
    });
  });

  describe('getStatusData', () => {
    it('should return statuses for all files', () => {
      const statusesData = { all: 1 };
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of(statusesData),
      );

      const statuses = filesService.getStatusData('inbound');
      statuses.subscribe(res => expect(res).toEqual(statusesData));
    });
  });

  describe('getSortedFiles', () => {
    it('should return files sorted by parameters', () => {
      jest.spyOn(filesService['request'], 'get').mockReturnValue(
        of([ testFile ]),
      );

      const files = filesService.getSortedFiles('date', 'asc', 'success');
      files.subscribe(res => expect(res).toEqual([ testFile ]));
    });
  });

  describe('getFilteredFiles', () => {
    it('should return files filtered by parameters', () => {
      jest.spyOn(filesService['request'], 'post').mockReturnValue(
        of([ testFile ]),
      );

      const filteredFiles = filesService.getFilteredFiles(fileFilterRequest);
      filteredFiles.subscribe(res => expect(res).toEqual([ testFile ]));
    });
  });
});
