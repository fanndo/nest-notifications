import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { NotificationsService } from '../services/notifications.service';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { ValidationMongoIdPipe } from '../../common/validation-mongo-id/validation-mongo-id.pipe'
import { FilterNotificationDto } from '../dto/filter-notification.dto';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { JwtGuard } from '../guard/jwt/jwt.guard';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() notification: CreateNotificationDto) {
    return this.notificationsService.create(notification);
  }

  @Get()
  async findAll(@Query() params:FilterNotificationDto) {
    return await this.notificationsService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id',ValidationMongoIdPipe) id: string) {
    return await this.notificationsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id',ValidationMongoIdPipe) id: string, @Body() notification:UpdateNotificationDto) {
    return await this.notificationsService.update(id, notification);
  }
  
  @Delete(':id')
  async remove(@Param('id',ValidationMongoIdPipe) id: string) {
    return await this.notificationsService.remove(id);
  }
}
