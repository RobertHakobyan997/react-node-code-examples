export const baseUsersEventsAggregation = () => (
  [
    {
      $match: {
        data: { $ne: null }
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $group: {
        _id: {
          $ifNull: [
            '$data.newValue.user.globalProfileId',
            '$data.oldValue.user.globalProfileId',
          ],
        },
        creations: {
          $push: {
            $cond: [
              { $eq: [ '$topic', 'created' ] },
              '$createdAt',
              '$$REMOVE',
            ]
          }
        },
        modifications: {
          $push: {
            $cond: [
              { $not: { $eq: [ '$topic', 'created' ] } },
              '$$ROOT',
              '$$REMOVE',
            ]
          }
        }
      }
    },
    {
      $replaceWith: {
        userId: '$_id',
        creationDate: {
          $cond: [
            { $eq: [ { $size: '$creations' }, 0 ] },
            null,
            { $arrayElemAt: [ '$creations', 0 ] },
          ],
        },
        lastChange: {
          $cond: [
            { $eq: [ { $size: '$modifications', }, 0 ] },
            null,
            {  $arrayElemAt: [ '$modifications', 0 ] },
          ]
        }
      }
    },
    {
      $project: {
        'userId': 1,
        'creationDate': 1,
        'lastChange.topic': 1,
        'lastChange.createdAt': 1,
      }
    }
  ]
);
