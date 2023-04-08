import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';
import { IS_LOCAL } from 'ngpd-merceros-wealth-mdo-common-be/dist/utils/environments';

import mongoConfig from '../../../config/mongo.config';

export const databaseProviders = [
  {
    // ToDo: change to dynamic provider and take it from mongoConfig
    provide   : 'DatabaseConnection',
    useFactory: (): Promise<typeof mongoose> => {
      if (IS_LOCAL()) {
        mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
          const logger = new Logger(collectionName);
          const args = methodArgs.reduce((acc, next, idx) => {
            acc += JSON.stringify(next, null, 2) + (idx === methodArgs.length - 1 ? '' : ', ');
            return acc;
          }, '');
          logger.log(`${methodName}(${args})`);
        });
      }
      return mongoose.connect(mongoConfig().uri, mongoConfig().options);
    },
  },
];
