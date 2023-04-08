import { NotificationsApiModule } from 'ngpd-merceros-communication-adapter/dist/nestjs-adapter';

import notificationsConfig from '../communication.config';

export default NotificationsApiModule.forRoot(notificationsConfig);
