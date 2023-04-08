import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JSZip from 'jszip';
import { Connection } from 'mongoose';
import { ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import devConfig from '../../config/dev.config';
import { ReadOnlyGuard } from '../../core/guards/read-only.guard';
import { DataAccessAuthGuard } from '../../core/guards/data-access.guard';

import { DataAccessService } from './data-access.service';
import { CollectionDumpStatus } from './types/collection-dump-status';
import { DbQueryTransformInterceptor } from './db-query-transform.interceptor';
import { DEFAULT_PAGE_SIZE, EXCEPTIONS } from './constants';
import { checkIfObjectId, makeObjectId } from './pure/mongo.pure';

@ApiTags('data-access')
@Controller('data-access')
@UseGuards(DataAccessAuthGuard)
export class DataAccessController {
  constructor(
    @Inject('DbConnectionToken') private readonly dbConnection: Connection,
    private readonly service: DataAccessService,
  ) {
  }

  @ApiOperation({ summary: 'Get all collections' })
  @ApiOkResponse({ description: 'List of collections' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @Get('collections')
  collections() {
    return {
      collections: Object.keys(this.dbConnection.collections),
    };
  }

  @ApiOperation({ summary: 'Export collections' })
  @ApiOkResponse({ description: 'Export collections into a zip file' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @Get('export')
  @UseGuards(ReadOnlyGuard)
  async exportCollections(@Res() res) {
    if (!devConfig().dataAccessModule.collectionsList) {
      throw new InternalServerErrorException(EXCEPTIONS.COLLECTIONS_LIST_NOT_CONFIGURED);
    }

    try {
      const collections: Promise<CollectionDumpStatus>[] = [];
      for (const collectionName of devConfig().dataAccessModule.collectionsList) {
        collections.push(this.service.dumpMongooseCollection(collectionName));
      }

      const dumps: CollectionDumpStatus[] = await Promise.all(collections);

      const zip = new JSZip();

      for (const dump of dumps) {
        if (dump.status === 'dumped') {
          const stringedData = JSON.stringify(dump.body);
          zip.folder('collections').file(`${dump.name}.json`, Buffer.from(stringedData));
        }
      }

      const response = await zip.generateAsync({
        type: JSZip.support.uint8array ? 'uint8array' : 'string',
      });

      const date = new Date();
      const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${
        date.getDay() + 1
      }_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.zip`;

      res.status(200);
      res.set('Content-Type', 'application/zip');
      res.set('Content-Disposition', `attachment; filename=${fileName}`);
      res.end(Buffer.from(response));
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOperation({ summary: 'Import collections' })
  @ApiOkResponse({ description: 'Import collections from a zip file' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @Post('import')
  @UseGuards(ReadOnlyGuard)
  @UseInterceptors(FileInterceptor('collections'))
  async importCollections(@UploadedFile() file: any) {
    try {
      if (file) {
        await this.service.importFromFile(file.buffer);
      } else if (devConfig().dataAccessModule.dbFilesDirPath) {
        await this.service.importFromLocal();
      } else {
        throw new InternalServerErrorException('Local DB files dir is not configured');
      }

      return { success: true };
    } catch (e) {
      throw new HttpException(e.message || 'Error while importing reference data', e.status || 500);
    }
  }

  @ApiOperation({ summary: 'Get all documents in collection' })
  @ApiOkResponse({ description: 'List of documents' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error' })
  @ApiBody({ type: Object })
  @Post('query-collection')
  @UseInterceptors(DbQueryTransformInterceptor)
  async queryCollection(
    @Query('collectionName') collectionName: string,
    @Query('limit') limit: number = DEFAULT_PAGE_SIZE,
    @Query('offset') offset = 0,
    @Body() query: Record<string, unknown>,
  ) {
    try {
      const collection = this.dbConnection.collection(collectionName);
      const documents = await collection
        .find(query ? query : {})
        .skip(+offset)
        .limit(+limit)
        .toArray();

      return { documents };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiOperation({ summary: 'Add document to collection' })
  @ApiOkResponse({ description: 'Document added' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error' })
  @Post('collection')
  @UseInterceptors(DbQueryTransformInterceptor)
  @UseGuards(ReadOnlyGuard)
  async insertDocument(@Query('collectionName') collectionName: string, @Body() document: Record<string, unknown>[]) {
    try {
      const collection = this.dbConnection.db.collection(collectionName);

      return await collection.insertMany(document);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOperation({ summary: 'Update document in collection' })
  @ApiOkResponse({ description: 'Document updated' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error' })
  @Put('collection')
  @UseInterceptors(DbQueryTransformInterceptor)
  @UseGuards(ReadOnlyGuard)
  async updateDocument(
    @Query('collectionName') collectionName: string,
    @Query('documentId') documentId: string,
    @Body() document: Record<string, unknown>,
  ) {
    try {
      const collection = this.dbConnection.db.collection(collectionName);

      return await collection.findOneAndUpdate({ _id: new ObjectId(documentId) }, { $set: document });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOperation({ summary: 'Drop collection' })
  @ApiOkResponse({ description: 'Successfully dropped collection' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error' })
  @Delete('drop-collection')
  @UseGuards(ReadOnlyGuard)
  async deleteCollection(@Query('collectionName') collectionName: string) {
    try {
      return await this.dbConnection.db.dropCollection(collectionName);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOperation({ summary: 'Remove single or multiple documents' })
  @ApiOkResponse({ description: 'Successfully removed documents' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error', })
  @Delete('collection')
  @UseGuards(ReadOnlyGuard)
  async deleteAllCollection(
    @Query('collectionName') collectionName: string,
    @Body() body: { removeQuery: Record<string, unknown> },
  ) {
    const removeQuery: any = body.removeQuery;

    if (removeQuery) {
      for (const queryKey in removeQuery) {
        // eslint-disable-next-line no-prototype-builtins
        if (!removeQuery.hasOwnProperty(queryKey)) {
          continue;
        }

        if (typeof removeQuery[queryKey] === 'object' && removeQuery[queryKey]['$in']) {
          removeQuery[queryKey]['$in'].forEach((objectIdString, index) => {
            const objectId = checkIfObjectId(objectIdString);
            if (objectId) {
              removeQuery[queryKey]['$in'][index] = makeObjectId(objectId);
            }
          });
          continue;
        }

        const objectId = checkIfObjectId(removeQuery[queryKey]);
        if (objectId) {
          removeQuery[queryKey] = makeObjectId(objectId);
        }
      }
    }

    try {
      const collection = this.dbConnection.db.collection(collectionName);
      if (removeQuery) {
        return await collection.deleteMany(removeQuery);
      } else {
        throw new HttpException(
          'No removeQuery specified. Please supply an object of the following form: {"removeQuery": {"field1" : "field1Value"}}',
          400,
        );
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiOperation({ summary: 'Get the number of documents in collection' })
  @ApiOkResponse({ description: 'Count of documents' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error' })
  @Get('collection/count')
  async countCollection(@Query('collectionName') collectionName: string) {
    try {
      const collection = this.dbConnection.db.collection(collectionName);

      return await collection.countDocuments();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ApiOperation({ summary: 'Get the number of documents in collection based on search query' })
  @ApiOkResponse({ description: 'Count of documents' })
  @ApiForbiddenResponse({ description: EXCEPTIONS.FORBIDDEN })
  @ApiInternalServerErrorResponse({ description: 'Database error' })
  @Post('collection/count')
  async countCollectionByQuery(
    @Query('collectionName') collectionName: string,
    @Body() query: Record<string, unknown> = {},
  ): Promise<number> {
    const collection = this.dbConnection.db.collection(collectionName);

    const result = await collection.find(query).toArray();

    return result.length;
  }
}
