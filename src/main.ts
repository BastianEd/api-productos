import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Habilitar CORS de forma segura ---
  app.enableCors({
    // Origen permitido (tu frontend de React en desarrollo)
    origin: 'http://localhost:5173',
    // Métodos HTTP que permites desde el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // Permite que el frontend envíe credenciales (como cookies o headers de autenticación)
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // --- Configuración de Swagger ---
  const config = new DocumentBuilder()
    .setTitle('API de Productos')
    .setDescription(
      'Una API REST para gestionar productos, construida con NestJS.',
    )
    .setVersion('1.0')
    .addTag('productos', 'Operaciones relacionadas con productos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // La ruta para acceder a la UI de Swagger

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(
    `Aplicación corriendo en: http://localhost:${port}/api/v1/productos/`,
  );
  console.log(
    `Documentación de la API disponible en: http://localhost:${port}/api-docs`,
  );
}
bootstrap();
