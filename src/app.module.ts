import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import * as Joi from 'joi'

import { NotificationsModule } from './notifications/notifications.module';
import { DatabaseModule } from './database/database.module';
import config from './config/config';
import { enviroments } from './config/enviroments';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV as keyof typeof enviroments] || '.env',
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        WS_PORT: Joi.number().required(),
        PREFIX:Joi.string().required(),
        PUBLIC_KEY:Joi.string().required(),
        ISSUER:Joi.string().required(),
        AUDIENCE:Joi.string().required(),
        ALGORITHMS:Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required()
      }),
    }),
    NotificationsModule, DatabaseModule, AuthModule, UsersModule],
  providers: [],
})
export class AppModule {}
