import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173', // react
    ],
  });
  app.setGlobalPrefix(process.env.PREFIX || 'api/v1');
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transformOptions:{  
      enableImplicitConversion:true,
      // excludeExtraneousValues:true,
      // excludePrefixes: ['_'],
    }
  }));
  const config = new DocumentBuilder()
  .setTitle('Notification Service')
  .setDescription('Servicio de Notificaciones')
  .setVersion('1.0')
  .build();
  
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
