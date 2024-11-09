import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('CRM API application')
    .setVersion('0.1')
    .addBearerAuth()
    .addTag('accounts')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFileSync('./swagger-docs.json', JSON.stringify(document, null, 2));

  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log("\x1b[1m\x1b[32mSwagger is running on: http://localhost:3000/api\x1b[0m");
  });

}
bootstrap();
