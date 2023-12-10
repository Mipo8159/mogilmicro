import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Mogilmicro')
    .setDescription('CQRS API description')
    .setVersion('1.0')
    .addTag('CQRS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, () => {
    logger.log(`App Running on PORT: ${PORT}`);
    logger.log(`API Documentation: http://localhost:3000/api/docs`);
  });
}
bootstrap();
