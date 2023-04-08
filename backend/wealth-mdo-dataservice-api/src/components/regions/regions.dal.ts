import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Logger } from 'ngpd-merceros-logger-be';
import { plainToClass } from 'class-transformer';
import RegionsModel, { RegionsModelToken } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/model/mongoose/regions';
import Enum from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/enum';
import { Document } from 'ngpd-merceros-wealth-mdo-common-be/dist/domain/structures/mongodb/document';

@Injectable()
export class RegionsDal {
  private readonly logger = new Logger(RegionsDal.name);

  constructor(@Inject(RegionsModelToken) private readonly model: Model<Document<Enum>>) {
  }

  findAll(filter: FilterQuery<Document<Enum>> = {}, sort: string | any = {}, options: any = {}) {
    return this.model
      .find(filter, {}, options)
      .sort(sort)
      .exec();
  }

  findOne(filter: FilterQuery<Document<Enum>> = {}) {
    return this.model.findOne(filter).exec();
  }

  findById(id: any, options: any = {}) {
    return this.model.findById(id, {}, options).exec();
  }

  insert(docs: any[]) {
    return this.model.insertMany(plainToClass(RegionsModel, docs));
  }

  findByIdAndUpdate(id: any, docs: UpdateQuery<Enum>) {
    return this.model.findByIdAndUpdate(id, plainToClass(RegionsModel, docs));
  }

  findByIdAndDelete(id: any) {
    return this.model.findByIdAndDelete(id);
  }
}
