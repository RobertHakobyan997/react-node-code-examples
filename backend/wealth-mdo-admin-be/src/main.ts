import { readFileSync } from 'fs';
import { tracer } from 'dd-trace';
import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AllExceptionFilter } from 'ngpd-merceros-logger-be';
import { Logger, ValidationPipe } from '@nestjs/common';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { AppModule } from './app.module';
import appConfig from './config/app.config';
import ddConfig from './config/dd.config';
import { IS_LOCAL, IS_PROD } from './utilities/environment.utils';

async function bootstrap() {
  const appOptions = {} as any;
  if (IS_LOCAL)
    appOptions.httpsOptions = {
      key : readFileSync(resolve(process.cwd(), 'util/dev-server.key')),
      cert: readFileSync(resolve(process.cwd(), 'util/dev-server.crt')),
    };

  // TODO: uncomment it when Communication and Document services become ready
  tracer.init({
    hostname    : ddConfig.ddHost,
    env         : ddConfig.ddEnv,
    service     : ddConfig.ddService,
    enabled     : ddConfig.ddEnabled,
    tags        : { env: ddConfig.ddEnv, apptype: 'nodejs' },
    version     : appConfig.version,
    sampleRate  : ddConfig.ddSampleRate,
    logInjection: true
  });

  const app = await NestFactory.create(AppModule, appOptions);

  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setVersion(appConfig.version)
    .addTag(appConfig.name)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.use(bodyParser.urlencoded({ extended: false })); // NOSONAR
  app.use(cookieParser());
  app.enableCors({
    origin        : appConfig.cors,
    credentials   : true,
    exposedHeaders: [
      'Accept',
      'authorization',
      'Authentication',
      'Content-Type',
      'If-None-Match',
      'SourceType',
    ],
  });
  app.useLogger(IS_PROD ? logger : new Logger());
  app.useGlobalFilters(new AllExceptionFilter(app.getHttpAdapter()));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(appConfig.port);
}

bootstrap();
