import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationsService } from './services/notifications.service';
import { NotificationsController } from './controllers/notifications.controller'
import { Notification, NotificationSchema } from './entities/notification.entity';
import { NotificationsGateway } from './notifications.gateway';


@Module({
  imports:[
    MongooseModule.forFeature([
    {
      name: Notification.name,
      schema: NotificationSchema
    } 
  ])],
  controllers: [NotificationsController],
  providers: [NotificationsService,NotificationsGateway],
  exports: [NotificationsService],

})
export class NotificationsModule {}
