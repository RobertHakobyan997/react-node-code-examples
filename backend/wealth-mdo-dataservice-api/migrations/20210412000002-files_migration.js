const faker = require('faker');
const { DateTime } = require('luxon');
const { Types } = require('mongoose');

const COLLECTION_NAME = 'files';

const usersId = [
  Types.ObjectId('5db311afef8df000195645b1'),
  Types.ObjectId('5db311afef8df000195645ba'),
  Types.ObjectId('5db311afef8df000195645bc'),
  Types.ObjectId('5db311af5794e200194891e4'),
  Types.ObjectId('5db311af5794e200194891e6'),
  Types.ObjectId('5db311afef8df000195645be'),
  Types.ObjectId('5db311afef8df000195645c0'),
  Types.ObjectId('5db311af5794e200194891e8'),
  Types.ObjectId('5db311afef8df000195645c2'),
  Types.ObjectId('5db311af5794e200194891ea'),
  Types.ObjectId('5db311afef8df000195645c4'),
];

module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        const metadata = await db.collection('files-metadata').find().toArray();
        const collection = await db.createCollection(COLLECTION_NAME);
        const docs = [];

        usersId.forEach(id => {
          for (let i = 0; i <= 100; i++) {
            const docId = Types.ObjectId();
            const fName = `BNP_Positions_Fund_International_${DateTime.fromJSDate(faker.date.recent()).toFormat('ddmmyyyyhhMMss')}.csv`;
            const uploadDate = faker.date.past();
            const statusFaker = faker.datatype.number(7);
            const randomMetadata = metadata[faker.datatype.number({ min: 0, max: metadata.length - 1 })];

            docs.push({
              _id            : docId,
              filesMetadataId: randomMetadata._id,
              sourceFileData : {
                fileName               : fName,
                uploadedDate           : uploadDate,
                numberOfRecords        : faker.datatype.number({ min: 200, max: 3000 }),
                filteredNumberOfRecords: faker.datatype.number({ min: 0, max: 3000 }),
                externalLocation       : 'globalScape',
                path                   : `ftp://intranetftp.mercer.com/public/wealth/MDO/${fName}`,
                supplier               : 'bnp',
                fileType               : 'positions',
                fileDirection          : faker.datatype.number(7) < 3 ? 'inbound' : (faker.datatype.number(7) > 5 ? 'error' : 'outbound'),
                fileSize               : 1234,
                entityType             : 'fund',
                region                 : 'international',
                fileFormat             : randomMetadata.fileFormat,
              },
              uploadedBy     : faker.datatype.number(5) < 3 ? 'system' : id,
              mosDocumentData: {
                documentId : docId,
                fileName   : fName,
                contentType: 'text/csv',
                length     : 1234,
                uploadDate : uploadDate,
              },
              processWorkflowData: {
                processId  : 'Process_01sjmza',
                processName: 'Default_File_Process_Workflow',
                instanceId : 'Process_01sjmza:2:118ed9ff-7777-11eb-b1b4-0242ac11004e',
              },
              state: {
                processingStatus: statusFaker < 3 ? 'success' : statusFaker > 5 ? 'technicalError' : 'finishedWithErrors',
                errorMessage    : statusFaker < 3 ? '' : 'Something went wrong',
                scheduleStatus  : statusFaker < 3 ? 'onTime' : 'late',
              },
            });
          }
        });

        const inboundFiles = docs.filter(doc => doc.sourceFileData.fileDirection === 'inbound' && doc.state.processingStatus !== 'failed');
        docs.filter(doc => doc.sourceFileData.fileDirection !== 'inbound').forEach(doc => {
          doc.masterFileId = inboundFiles[faker.datatype.number(inboundFiles.length -1)]?._id ?? '';
          doc.masterFileName = inboundFiles[faker.random.number(inboundFiles.length -1)]?.sourceFileData?.fileName ?? '';
        });

        await collection.insertMany(docs);
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.dropCollection(COLLECTION_NAME);
      });
    } finally {
      await session.endSession();
    }
  },
};
