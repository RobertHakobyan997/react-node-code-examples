const ObjectId = require('mongodb').ObjectId;

const manageRolesPermissions = [ {
    _id: new ObjectId('61f3c6d1a8ea9096ab27d7ce'),
    permission: 'resend file',
    roles: [ 'basic user' ],
    disabledRolesForManage: [ 'basic user' ]
  },
  {
    _id: new ObjectId('61f3c7afa8ea9096ab27d7cf'),
    permission: 'reprocess file',
    roles: [ 'basic user' ],
    disabledRolesForManage: [ 'basic user' ]
} ];

exports.manageRolesPermissions = () => manageRolesPermissions;
