import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { NotificationsService } from 'src/notifications/services/notifications.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly notificationsService: NotificationsService, 
    private readonly userService: UsersService) {}

  @Post()
  create(@Body() notification: any) {
    return this.userService.create(notification);
  }

  @Get(':accountNumber/notifications')
  findNotifications(@Param('accountNumber') accountNumber: string){
    return this.notificationsService.findByUserId(accountNumber)
  }
  
}
