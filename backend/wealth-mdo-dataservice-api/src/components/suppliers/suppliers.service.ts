import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

import { SuppliersDal } from './suppliers.dal';

@Injectable()
export class SuppliersService {
  constructor(private readonly dal: SuppliersDal) {
  }

  findAll(filter: FilterQuery<Document<Suppliers>> = {}, sort: string | any = {}, options: any = {}) {
    return this.dal.findAll(filter, sort, options);
  }
}
