import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DataAccessModule } from 'ngpd-merceros-dataaccess-components/dist';

import { AppImportsLoader } from './app-imports-loader';
import devConfig from './config/dev.config';
import { LoggerMiddleware } from './core/middlewares/logger.middleware';
import { mssoSaml } from './core/middlewares/msso-saml.middleware';
import { ComponentsModule } from './components/components.module';
import { TechniquesModule } from './techniques/techniques.module';

@Module({
  imports    : [
    ...AppImportsLoader.load('config/imports/*.imports.{ts,js}'),
    ScheduleModule.forRoot(),
    DataAccessModule.forRoot({
      accessKey        : devConfig.dataAccessModule.accessKey,
      importKey        : devConfig.dataAccessModule.importKey,
      readOnly         : devConfig.dataAccessModule.allowWrite,
      dbConnectionToken: devConfig.dataAccessModule.dbConnectionToken,
      dbFilesDirPath   : devConfig.dataAccessModule.dbFilesDirPath,
      collectionsList  : devConfig.dataAccessModule.collectionsList,
    }),
    ComponentsModule,
    TechniquesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(mssoSaml, LoggerMiddleware)
      .forRoutes({ path: 'msso/log*/callback', method: RequestMethod.POST });
  }
}
