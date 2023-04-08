import { Inject, Injectable } from '@nestjs/common';
import { readdirSync, readFile } from 'fs';
import { loadAsync } from 'jszip';
import { Connection } from 'mongoose';
import * as path from 'path';
import * as util from 'util';

import devConfig from '../../config/dev.config';

import { CollectionDumpStatus } from './types/collection-dump-status';
import { checkIfObjectId, makeObjectId } from './pure/mongo.pure';

@Injectable()
export class DataAccessService {
  private looseObjectIdDetection: boolean;

  constructor(@Inject('DbConnectionToken') private readonly dbConnection: Connection) {
    this.looseObjectIdDetection = false;
  }

  enableLooseObjectIdDetection(): DataAccessService {
    this.looseObjectIdDetection = true;

    return this;
  }

  disableLooseObjectIdDetection(): DataAccessService {
    this.looseObjectIdDetection = false;

    return this;
  }

  async importFromFile(buffer: Buffer): Promise<void> {
    const zip = await loadAsync(buffer);

    for (const collection of zip.file(/^collections\//)) {
      // ignoring sub-folders
      if (collection.dir === true) {
        continue;
      }

      if (collection.name.search('.json') === -1) {
        continue;
      }

      const collectionName = path.basename(collection.name, '.json');

      if (!devConfig().dataAccessModule.collectionsList.includes(collectionName)) {
        continue;
      }

      try {
        await this.importMongooseCollection(collectionName, await collection.async('string'));
      } catch (e) {
        throw new Error(`Error while reading or inserting ${collectionName} collection`);
      }
    }
  }

  async importFromLocal(): Promise<void> {
    const files = readdirSync(devConfig().dataAccessModule.dbFilesDirPath);
    const readFilePromisified = util.promisify(readFile);

    for (const filename of files) {
      if (filename.search('.json') === -1) {
        continue;
      }

      const collectionName = path.basename(filename, '.json');

      if (!devConfig().dataAccessModule.collectionsList.includes(collectionName)) {
        continue;
      }

      try {
        const fileContent = await readFilePromisified(devConfig().dataAccessModule.dbFilesDirPath + filename, 'utf-8');

        await this.importMongooseCollection(collectionName, fileContent);
      } catch (e) {
        throw new Error(`Error while reading or inserting ${collectionName} collection`);
      }
    }
  }

  async dumpMongooseCollection(collectionName: string): Promise<CollectionDumpStatus> {
    const collection = this.dbConnection.collection(collectionName);

    const data = await collection.find().toArray();

    if (!data || !data.length) {
      return {
        name  : collectionName,
        status: 'ignored',
      };
    }

    const body = data.map(doc => this.convertExportDataRecursively(doc));

    return {
      name  : collectionName,
      status: 'dumped',
      body,
    };
  }

  async importMongooseCollection(collectionName: string, body: string): Promise<void> {
    this.enableLooseObjectIdDetection();

    const collection = this.dbConnection.collection(collectionName);

    if (body && body.length) {
      const documentArray: Record<string, unknown>[] = JSON.parse(body);

      await collection.deleteMany({});
      await collection.insertMany(documentArray.map(item => this.recursiveAddObjects(item)));
    }
  }

  convertExportDataRecursively(object: Record<string, any>): Record<string, any> {
    let key;
    if (object instanceof Object) {
      for (key in object) {
        // eslint-disable-next-line no-prototype-builtins
        if (object.hasOwnProperty(key) && object[key] instanceof Object) {
          if (object[key]['_bsontype'] === 'ObjectID') {
            object[key] = `ObjectId('${object[key].toString()}')`;
            continue;
          }

          if (object[key] instanceof Date) {
            object[key] = `ISODate('${object[key].toISOString()}')`;
            continue;
          }

          this.convertExportDataRecursively(object[key]);
        }
      }
    }

    return object;
  }

  recursiveAddObjects(object: Record<string, any>): Record<string, any> {
    let key;
    if (object instanceof Object) {
      for (key in object) {
        // eslint-disable-next-line no-prototype-builtins
        if (object.hasOwnProperty(key) && object[key] instanceof Object) {
          this.recursiveAddObjects(object[key]);
        } else if (object[key]) {
          const objectId = checkIfObjectId(object[key], this.looseObjectIdDetection);
          if (objectId) {
            object[key] = makeObjectId(objectId);

            continue;
          }

          const date = this.checkIfDate(object[key]);
          if (date) {
            object[key] = this.makeDate(date);
          }
        }
      }
    }

    return object;
  }

  private checkIfDate(value: string): string | false {
    // prettier-ignore
    const regex = new RegExp('(?<=ISODate\\(\\\')(.*)(?=\\\')');

    const found = regex.exec(value);
    if (found && !isNaN(Date.parse(found[0]))) {
      return found[0];
    }

    return false;
  }

  private makeDate(date: string): Date {
    return new Date(date);
  }
}
