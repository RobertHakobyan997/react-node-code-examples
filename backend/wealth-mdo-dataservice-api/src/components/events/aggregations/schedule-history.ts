export const scheduleHistoryAggregationSteps = (filter: any, field: string, sortOrder: number, statuses: string[], timeZone: string) => (
  [
    {
      $match: filter,
    },
    {
      $project: {
        topic       : 1,
        createdAt   : 1,
        data        : 1,
        fileReceived: 1,
        expectedDate: 1
      }
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format  : '%Y-%m-%d',
            date    : '$createdAt',
            timezone: timeZone
          },
        },
        alert: {
          $push: {
            $cond: [ { $eq: [ '$topic', 'alertSent' ] },
              '$$ROOT',
              '$$REMOVE'
            ],
          },
        },
        rest: {
          $push: {
            $cond: [
              { $not: { $eq: [ '$topic', 'alertSent' ] } },
              '$$ROOT',
              '$$REMOVE',
            ],
          },
        },
      },
    },
    {
      $addFields: {
        res: {
          $cond: [
            { $eq: [ { $size: '$rest' }, 0 ] },
            { $arrayElemAt: [ '$alert', 0 ] },
            { $arrayElemAt: [ '$rest', 0 ] },
          ],
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: '$res',
      },
    },
    {
      $sort: {
        [field]: sortOrder,
        ...(field === 'topic' ? { 'createdAt': -1 } : {})
      },
    },
    {
      $match: {
        topic: { $in: statuses }
      }
    }
  ]
);

export const scheduleHistoryLimitAggregationSteps = (skip: number, limit: number) => ([
  {
    $facet: {
      paginationData: [ {
        $count: 'totalDocs'
      } ],
      docs: [
        { $skip: skip },
        { $limit: limit },
      ]
    }
  },
  {
    $project: {
      totalDocs: {
        $arrayElemAt: [ '$paginationData.totalDocs', 0 ]
      },
      docs: 1
    }
  }
]);
