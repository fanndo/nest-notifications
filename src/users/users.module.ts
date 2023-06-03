import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationsModule } from '../notifications/notifications.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports:[
    NotificationsModule,
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    } 
  ])],
  controllers: [UsersController],
  providers:[UsersService]
})
export class UsersModule {}
