import { ObjectId } from 'mongodb';

export const testLocalizations = [
  {
    _id: new ObjectId('6078f858194984ad90f1b507'),
    language: 'en',
    localization: {
      hello: 'hello',
    },
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b506'),
    language: 'fr',
    localization: {
      hello: 'bonjour',
    },
  },
  {
    _id: new ObjectId('6078f858194984ad90f1b506'),
    language: 'it',
    localization: {
      hello: 'ciao',
    },
  },
];

export const testLocalizationsResult = {
  en: { hello: 'hello' },
  fr: { hello: 'bonjour' },
  it: { hello: 'ciao' },
};
