import { Frequency } from 'ngpd-merceros-wealth-mdo-common-be/dist/constants';

export const isNonDailyMetadata = frequency => frequency === Frequency.Monthly || frequency === Frequency.ContinuousMonthly;

export const isMonthlyMetadata = frequency => frequency === Frequency.Monthly;
