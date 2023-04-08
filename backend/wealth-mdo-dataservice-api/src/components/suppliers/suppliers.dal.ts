import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import SuppliersModel, { SuppliersModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/suppliers';
import Suppliers from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/suppliers';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

@Injectable()
export class SuppliersDal {
  private readonly logger = new Logger(SuppliersDal.name);

  constructor(@Inject(SuppliersModelToken) private readonly model: Model<Document<Suppliers>>) {
  }

  findAll(filter: FilterQuery<Document<Suppliers>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Suppliers>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, options: any = {}) {
    return this.model.findById(id, {}, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(SuppliersModel, docs));
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<Suppliers>) {
    return this.model.findByIdAndUpdate(id, plainToClass(SuppliersModel, docs));
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
