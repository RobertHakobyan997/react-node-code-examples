import { Injectable } from '@nestjs/common';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { SuppliersService } from '../suppliers/suppliers.service';
import { FileTypesService } from '../file-types/file-types.service';
import { RegionsService } from '../regions/regions.service';

@Injectable()
export class StaticDataService {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly fileTypesService: FileTypesService,
    private readonly regionsService: RegionsService
  ) {}

  findStaticDataForValidation() {
    return zip(
      this.suppliersService.findAll(),
      this.fileTypesService.findAll(),
    ).pipe(
      map(([ suppliers, fileTypes ]) => [
        suppliers,
        fileTypes,
      ])
    );
  }

  findStaticDataForMissingFile() {
    return zip(
      this.suppliersService.findAll(),
      this.fileTypesService.findAll(),
      this.regionsService.findAll()
    ).pipe(
      map(([ suppliers, fileTypes, regions ]) => [
        suppliers,
        fileTypes,
        regions,
      ])
    );
  }
}
