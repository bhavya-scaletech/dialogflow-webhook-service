import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { logger } from './logger';

/**
 * @description to create swagger documentation
 * @param app
 */
export async function swagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  // Enable basic auth for swagger UI
  app.use(
    ['/docs'],
    basicAuth({
      challenge: true,
      users: {
        [configService.getOrThrow(
          'SWAGGER_USERNAME',
        )]: `${configService.getOrThrow('SWAGGER_PASSWORD')}`,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(`${configService.getOrThrow('APP_NAME')} Documentation`)
    .setDescription('API docs')
    .setVersion('1.0')
    .addServer(configService.getOrThrow('APP_URL'), 'current')
    .addBearerAuth({
      type: 'apiKey',
      scheme: 'Bearer',
      name: 'authorization',
      in: 'header',
    })
    .addTag(configService.getOrThrow('APP_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  logger.log(
    `Swagger Documentation of the Backend is available at ${configService.getOrThrow(
      'APP_URL',
    )}/docs`,
  );
}
