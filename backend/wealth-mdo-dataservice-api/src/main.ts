import { readFileSync } from 'fs';
import { tracer } from 'dd-trace';
import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AllExceptionFilter } from 'ngpd-merceros-logger-be';
import { Logger, ValidationPipe } from '@nestjs/common';
import { IS_LOCAL, IS_PROD } from 'ngpd-merceros-wealth-mdo-common-be/dist/utils/environments';
import { logger } from 'ngpd-merceros-wealth-mdo-common-be/dist/logger/mdo-logger';

import { AppModule } from './app.module';
import appConfig from './config/app.config';

async function bootstrap() {
  const appOptions = {} as any;
  if (IS_LOCAL())
    appOptions.httpsOptions = {
      key : readFileSync(resolve(__dirname, 'dev-server.key')),
      cert: readFileSync(resolve(__dirname, 'dev-server.crt')),
    };

  tracer.init({
    hostname    : appConfig().ddHost,
    env         : appConfig().ddEnv,
    service     : appConfig().ddService,
    enabled     : appConfig().ddEnabled,
    tags        : { env: appConfig().ddEnv, apptype: 'nodejs' },
    version     : appConfig().version,
    sampleRate  : appConfig().ddSampleRate,
    logInjection: false
  });

  const app = await NestFactory.create(AppModule, appOptions);

  const options = new DocumentBuilder()
    .setTitle(appConfig().name)
    .setVersion(appConfig().version)
    .addTag(appConfig().name)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      operationsSorter: (methodA, methodB) => {
        const methodsOrder = [ 'post', 'get', 'put', 'patch', 'delete', 'options', 'trace' ]; // CRUD order

        let result = methodsOrder.indexOf(methodA.get('method')) - methodsOrder.indexOf(methodB.get('method'));

        if (result === 0) {
          result = methodA.get('path').localeCompare(methodB.get('path'));
        }

        return result;
      }
    }
  });

  // Extended for import/export
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.use(cookieParser());
  app.useLogger(IS_PROD() ? logger : new Logger());
  app.useGlobalFilters(new AllExceptionFilter(app.getHttpAdapter()));
  app.useGlobalPipes(new ValidationPipe({
    transform: false,
    whitelist: true,
  }));

  await app.listen(appConfig().port);
}

bootstrap();
