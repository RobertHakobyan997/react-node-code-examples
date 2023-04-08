import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { plainToClass } from 'class-transformer';
import FrequenciesModel, { FrequenciesModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/frequencies';
import Frequencies from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/frequencies';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

@Injectable()
export class FrequenciesDal {

  constructor(@Inject(FrequenciesModelToken) private readonly model: Model<Document<Frequencies>>) {
  }

  findAll(filter: FilterQuery<Document<Frequencies>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Frequencies>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, options: any = {}) {
    return this.model.findById(id, {}, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(FrequenciesModel, docs));
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<Frequencies>) {
    return this.model.findByIdAndUpdate(id, plainToClass(FrequenciesModel, docs));
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
