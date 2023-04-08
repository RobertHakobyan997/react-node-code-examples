const ObjectId = require('mongodb').ObjectId;

const roles = [
  {
    _id: ObjectId('5db311af5794e200194891e0'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'advanced user',
    permissions: [
      ObjectId('60ba0cd35b0d39865a5760af'),
      ObjectId('60ba0d06dd3a1fedbc451f23'),
      ObjectId('60ba0d33315b5052dcaf5fde'),
      ObjectId('60ba0d3a51ca2ccff4883c78'),
      ObjectId('6151d8872d6e37b573c4485a'),
      ObjectId('616da1c2b3dccbbc2084daf2'),
      ObjectId('61766db82076443cf7ebf067'),
      ObjectId('61766f7994be26ed7ebf7610'),
      ObjectId('6188678924fdeb36a1d33931'),
      ObjectId('6188ecd924fdeb36a1d3393d'),
      ObjectId('6193613c0444c3dae53fb7b9'),
      ObjectId('619f41f84cd8c0b1312db21b'),
      ObjectId('61a0ebb694747857153bf605'),
      ObjectId('61a0eb491a674a0d461c538a'),
      ObjectId('61a0eb641a674a0d461c538b'),
      ObjectId('6193613c0424c3dbe53fb7b8'),
      ObjectId('61a8b0b5bd3638bc0903ba59'),
      ObjectId('61cab1df19571116ec674086'),
      ObjectId('61cc3f17557d7555fe29721f'),
      ObjectId('61c998710e8f7d7d6725be8c'),
      ObjectId('61e93cc7597f228ef5f62cb2'),
      ObjectId('620cf8a4e753b1affae2d383')
    ]
  },
  {
    _id: ObjectId('6151c4c42d6e37b573c4484e'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'basic user',
    permissions: [
      ObjectId('60ba0cd35b0d39865a5760af'),
      ObjectId('60ba0d06dd3a1fedbc451f23'),
      ObjectId('60ba0d33315b5052dcaf5fde'),
      ObjectId('60ba0d3a51ca2ccff4883c78'),
      ObjectId('616da1c2b3dccbbc2084daf2'),
      ObjectId('6193613c0424c3dbe53fb7b8'),
      ObjectId('61a8b0b5bd3638bc0903ba59'),
      ObjectId('61c998710e8f7d7d6725be8c'),
      ObjectId('61e93cc7597f228ef5f62cb2'),
      ObjectId('61cab1df19571116ec674086'),
      ObjectId('61cc3f17557d7555fe29721f')
    ]
  },
  {
    _id: ObjectId('5db312af5794e200194891e0'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'superadmin',
    permissions: [
      ObjectId('60ba0c2456670fc00a5649b0'),
      ObjectId('60ba0c3be6129e07eb9d3043'),
      ObjectId('6151e7142d6e37b573c44878'),
      ObjectId('60ba0c4005cbf04f78f45b30'),
      ObjectId('60ba0c4b9dae2e80cbed2769'),
      ObjectId('60ba0c820142afde977972f8'),
      ObjectId('60ba0c888624a2ddfa8a3384'),
      ObjectId('60ba0c8c17e1e8554d22986b'),
      ObjectId('60ba0ccf5d4f3e88714a7652'),
      ObjectId('60ba0cd35b0d39865a5760af'),
      ObjectId('60ba0d06dd3a1fedbc451f23'),
      ObjectId('60ba0d33315b5052dcaf5fde'),
      ObjectId('60ba0d3a51ca2ccff4883c78'),
      ObjectId('60ba0d5e0aff6126e886ee2e'),
      ObjectId('60ba0d6325a7b346a23e5237'),
      ObjectId('6151d8872d6e37b573c4485a'),
      ObjectId('616da1c2b3dccbbc2084daf2'),
      ObjectId('61766db82076443cf7ebf067'),
      ObjectId('61766f7994be26ed7ebf7610'),
      ObjectId('6188678924fdeb36a1d33931'),
      ObjectId('6188ecd924fdeb36a1d3393d'),
      ObjectId('6193613c0444c3dae53fb7b9'),
      ObjectId('619f41f84cd8c0b1312db21b'),
      ObjectId('61a0ebb694747857153bf605'),
      ObjectId('61a0eb491a674a0d461c538a'),
      ObjectId('61a0eb641a674a0d461c538b'),
      ObjectId('6193613c0424c3dbe53fb7b8'),
      ObjectId('61a8e17b48fba56a3aec6f51'),
      ObjectId('61a8b0b5bd3638bc0903ba59'),
      ObjectId('61b268ced79c9c16d5750c9a'),
      ObjectId('61cab1df19571116ec674086'),
      ObjectId('61cc3f17557d7555fe29721f'),
      ObjectId('61c998710e8f7d7d6725be8c'),
      ObjectId('61e7db43f51ec1eebad20fdf'),
      ObjectId('61e93cc7597f228ef5f62cb2'),
      ObjectId('61f24a12b375281ccfe37ad6'),
      ObjectId('620cf8a4e753b1affae2d383')
    ]
  },
  {
    _id: ObjectId('5db311afef8df000195645b7'),
    appId: ObjectId('5db311aed7e95996b336f461'),
    name: 'security admin',
    permissions: [
      ObjectId('60ba0c2456670fc00a5649b0'),
      ObjectId('6151e7142d6e37b573c44878'),
      ObjectId('60ba0c4005cbf04f78f45b30'),
      ObjectId('60ba0c4b9dae2e80cbed2769'),
      ObjectId('60ba0c820142afde977972f8'),
      ObjectId('60ba0c888624a2ddfa8a3384'),
      ObjectId('60ba0c8c17e1e8554d22986b'),
      ObjectId('60ba0ccf5d4f3e88714a7652'),
      ObjectId('60ba0d5e0aff6126e886ee2e'),
      ObjectId('60ba0d6325a7b346a23e5237'),
      ObjectId('61a8e17b48fba56a3aec6f51'),
      ObjectId('61e7db43f51ec1eebad20fdf'),
      ObjectId('61f24a12b375281ccfe37ad6')
    ]
  }
];

exports.getRoles = () => roles;
