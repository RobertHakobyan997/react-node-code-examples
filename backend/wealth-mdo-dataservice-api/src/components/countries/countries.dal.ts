import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import CountriesModel, { CountriesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/countries';
import Countries from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/countries';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

@Injectable()
export class CountriesDal {
  private readonly logger = new Logger(CountriesDal.name);

  constructor(@Inject(CountriesModelToken) private readonly model: Model<Document<Countries>>) {
  }

  findAll(filter: FilterQuery<Document<Countries>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Countries>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, options: any = {}) {
    return this.model.findById(id, {}, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(CountriesModel, docs));
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<Countries>) {
    return this.model.findByIdAndUpdate(id, plainToClass(CountriesModel, docs));
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
