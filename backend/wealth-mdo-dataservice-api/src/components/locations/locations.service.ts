import { Injectable } from '@nestjs/common';

import { LocationsDal } from './locations.dal';

@Injectable()
export class LocationsService {
  constructor(private readonly dal: LocationsDal) {
  }

  findAll() {
    return this.dal.findAll();
  }
}
