const ObjectId = require('mongodb').ObjectId;

const permissions = [
  {
    _id: ObjectId('60ba0c2456670fc00a5649b0'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'create advanced user',
    __v: 0,
  },
  {
    _id: ObjectId('6151e7142d6e37b573c44878'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'create basic user',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0c3be6129e07eb9d3043'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'create super admin',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0c4005cbf04f78f45b30'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'create security admin',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0c4b9dae2e80cbed2769'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'delete account',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0c820142afde977972f8'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'activate account',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0c888624a2ddfa8a3384'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'suspend account',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0c8c17e1e8554d22986b'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'change personal details',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0ccf5d4f3e88714a7652'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'manage users',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0cd35b0d39865a5760af'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'dashboard page',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0d06dd3a1fedbc451f23'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'file search page',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0d33315b5052dcaf5fde'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'download file',
    __v: 0,
  },
  {
    _id: ObjectId('61cab1df19571116ec674086'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'resend file',
    __v: 0,
  },
  {
    _id: ObjectId('61cc3f17557d7555fe29721f'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'reprocess file',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0d3a51ca2ccff4883c78'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'user guides',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0d5e0aff6126e886ee2e'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'view log',
    __v: 0,
  },
  {
    _id: ObjectId('60ba0d6325a7b346a23e5237'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'download log',
    __v: 0,
  },
  {
    _id: ObjectId('6151d8872d6e37b573c4485a'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'edit metadata',
    __v: 0,
  },
  {
    _id: ObjectId('616da1c2b3dccbbc2084daf2'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'view metadata contacts',
    __v: 0
  },
  {
    _id: ObjectId('61766f7994be26ed7ebf7610'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'edit contacts',
    __v: 0
  },
  {
    _id: ObjectId('61766db82076443cf7ebf067'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'manage contacts',
    __v: 0
  },
  {
    _id: ObjectId('6188678924fdeb36a1d33931'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'add contacts',
    __v: 0
  },
  {
    _id: ObjectId('6188ecd924fdeb36a1d3393d'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'delete contacts',
    __v: 0
  },
  {
    _id: ObjectId('6193613c0444c3dae53fb7b9'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'manage calendars',
    __v: 0
  },
  {
    _id: ObjectId('619f41f84cd8c0b1312db21b'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'enable or disable holiday calendar',
    __v: 0
  },
  {
    _id: ObjectId('61a0ebb694747857153bf605'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'create holiday calendar',
    __v: 0
  },
  {
    _id: ObjectId('61a0eb491a674a0d461c538a'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'edit holiday calendar',
    __v: 0
  },
  {
    _id: ObjectId('61a0eb641a674a0d461c538b'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'delete holiday calendar',
    __v: 0
  },
  {
    _id: ObjectId('6193613c0424c3dbe53fb7b8'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'view holiday calendars',
    __v: 0
  },
  {
    _id: ObjectId('61a8e17b48fba56a3aec6f51'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'export users to csv',
    __v: 0
  },
  {
    _id: ObjectId('61a8b0b5bd3638bc0903ba59'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'view metadata schedule',
    __v: 0
  },
  {
    _id: ObjectId('61b268ced79c9c16d5750c9a'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'edit metadata timezone and hours',
    __v: 0
  },
  {
    _id: ObjectId('61c998710e8f7d7d6725be8c'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'file information page',
    __v: 0
  },
  {
    _id: ObjectId('61e7db43f51ec1eebad20fdf'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'manage permissions restriction',
    __v: 0
  },
  {
    _id: ObjectId('61e93cc7597f228ef5f62cb2'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'view schedule history',
  },
  {
    _id: ObjectId('61f24a12b375281ccfe37ad6'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'configure permissions',
    __v: 0
  },
  {
    _id: ObjectId('620cf8a4e753b1affae2d383'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'edit holiday calendars contacts',
    __v: 0
  }
];

exports.getPermissions = () => permissions;
