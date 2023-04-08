import getenv from 'getenv';

export default {
  calendarNotificationInetrval: getenv.int('SEND_NOTIFICATION_TO_UPDATE_EMAIL_CRON_TIME', 0)
};
