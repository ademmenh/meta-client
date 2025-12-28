import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseLoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformResponseInterceptor } from './common/interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalInterceptors(new ResponseLoggingInterceptor())
    app.useGlobalInterceptors(new TransformResponseInterceptor(app.get(Reflector)))
    const configService = app.get(ConfigService)
    const port = configService.getOrThrow<number>('PORT')
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.setGlobalPrefix('api');
    const env = configService.get('BUN_ENV')
    if (env === 'dev') {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('Butcher API')
            .setDescription('Butcher API Swagger documentation')
            .addApiKey(
                {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'access-token',
                    description: 'Access Token Cookie',
                },
                'access-token-cookie',
            )
            .addApiKey(
                {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'refresh-token',
                    description: 'Refresh Token Cookie',
                },
                'refresh-token-cookie',
            )
            .build()
        const document = SwaggerModule.createDocument(app, swaggerConfig)
        SwaggerModule.setup(`api/docs`, app, document)
    }

    await app.listen(port);
}

bootstrap();
