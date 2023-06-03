import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { NotificationsService } from './services/notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Server, Socket } from 'socket.io';

import config from './../config/config';


// @WebSocketGateway(parseInt(process.env.WS_PORT, 10) || 81, {
@WebSocketGateway(81,{
  cors: { origin: '*' },
})
export class NotificationsGateway {
  
  constructor(private readonly notificationsService: NotificationsService) {}
  
  @WebSocketServer() server: Server;

  @SubscribeMessage('auth.notification')
  handleJWT(@MessageBody() data:any){
    console.log('data recivida....',{data})
  }
  
  // @SubscribeMessage('createNotification')
  // create(@MessageBody() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationsService.create(createNotificationDto);
  // }

  // @SubscribeMessage('findAllNotifications')
  // findAll() {
  //   return this.notificationsService.findAll();
  // }

  @SubscribeMessage('findOneNotification')
  findOne(@MessageBody() id: string) {
    return this.notificationsService.findOne(id);
  }
  
  @OnEvent('notification.created')
  handleNotificationCreatedEvent(event: CreateNotificationDto) {
    this.server.emit('new_message',event);
  }

  // @SubscribeMessage('updateNotification')
  // update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationsService.update(.id, updateNotificationDto);
  // }

  // @SubscribeMessage('removeNotification')
  // remove(@MessageBody() id: string) {
  //   return this.notificationsService.remove(id);
  // }
}
