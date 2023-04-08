const ObjectId = require('mongodb').ObjectId;

// All globalProfileIds here are EmployeeIds
const roleUsers = [
  {
    _id: ObjectId('5db311afef8df000195645c1'),
    globalProfileId: '1205615',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195645c2'),
    globalProfileId: '1',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195645c3'),
    globalProfileId: '1214299',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195645c5'),
    globalProfileId: '1194564',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195645c6'),
    globalProfileId: '1191603',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195645c7'),
    globalProfileId: '1229074',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195645c8'),
    globalProfileId: '1199721',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195641c1'),
    globalProfileId: '1228008',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('5db311afef8df000195641c3'),
    globalProfileId: '1213066',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  },
  {
    _id: ObjectId('60770a173e63288bd81c3c37'),
    globalProfileId: '1214773',
    role: ObjectId('5db312af5794e200194891e0'),
    __v: 0,
  }
];

exports.getRoleUser = () => roleUsers;
