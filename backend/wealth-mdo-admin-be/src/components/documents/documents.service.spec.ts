import { of } from 'rxjs';

import { testFile } from '../../../test/data/documents/test-file.const';

import { assert } from './documents.service.spec-setup';
import { DocumentsService } from './documents.service';

describe('Documents service: ', () => {
  let documentsService: DocumentsService;

  beforeAll(async () => {
    documentsService = await assert();
  });

  describe('downloadFile', () => {
    it('should call request for download file', async () => {
      jest.spyOn(documentsService['request'], 'get').mockReturnValue(
        of({}),
      );
      await documentsService.downloadFile(`${testFile.documentId}`);
      expect(documentsService['request'].get).toHaveBeenCalled();
    });
  });
});
