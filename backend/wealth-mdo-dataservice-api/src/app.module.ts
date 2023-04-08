import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import loggerConfig from 'ngpd-merceros-wealth-mdo-common-be/dist/config/logger.config';

import devConfig from './config/dev.config';
import appConfig from './config/app.config';
import mongoConfig from './config/mongo.config';
import { ComponentsModule } from './components/components.module';
import { TechniquesModule } from './techniques/techniques.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load    : [ devConfig, appConfig, loggerConfig, mongoConfig ],
    }),
    ComponentsModule,
    TechniquesModule,
  ],
})
export class AppModule {
}
