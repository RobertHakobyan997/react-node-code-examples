import { FilesService } from '../../src/components/files/files.service';

export class MockFilesService {
  createFile = () => null;
  getFiles = () => null;
  getStatusData = () => null;
  getSortedFiles = () => null;
  getFilteredFiles = () => null;
}

export function provideMockFilesService() {
  return {
    provide: FilesService,
    useClass: MockFilesService,
  };
}
