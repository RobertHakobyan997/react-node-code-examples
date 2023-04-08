import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';
import { chain } from 'lodash';

import { Localization, LocalizationDocument } from '../../core/schemas/localizations.schema';

@Injectable()
export class LocalizationService {
  constructor(
    @InjectModel(Localization.name) private readonly model: Model<LocalizationDocument>,
  ) {
  }

  async getLocalizations() {
    logger.log('Get localizations');
    const localizations = await this.model.find().lean().exec();
    return chain(localizations)
      .keyBy('language')
      .mapValues('localization')
      .value();
  }
}
