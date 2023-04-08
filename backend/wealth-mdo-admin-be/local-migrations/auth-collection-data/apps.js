const ObjectId = require('mongodb').ObjectId;

const apps = [
  {
    _id: ObjectId('5db311aed7e95996b336f461'),
    name: 'wealth-mdo-admin-be',
    __v: 0,
  },
];

exports.getApps = () => apps;
