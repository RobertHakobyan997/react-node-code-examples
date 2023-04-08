import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Stream } from 'stream';

import { RequestService } from '../../core/request/request.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly request: RequestService) {
  }

  downloadFile(documentId: string): Observable<Stream> {
    const url = `${process.env.MOS_DOCUMENT_API}/documents/${documentId}/download`;
    return this.request.get<Stream>(url, { responseType: 'arraybuffer' });
  }
}
