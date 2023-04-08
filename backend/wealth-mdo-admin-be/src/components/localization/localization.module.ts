import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Localization, LocalizationSchema } from '../../core/schemas/localizations.schema';

import { LocalizationController } from './localization.controller';
import { LocalizationService } from './localization.service';

@Module({
  controllers: [ LocalizationController ],
  imports: [
    MongooseModule.forFeature([
      { name: Localization.name, schema: LocalizationSchema },
    ]),
  ],
  providers: [
    LocalizationService,
  ],
})
export class LocalizationModule {
}
