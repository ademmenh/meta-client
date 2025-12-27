import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.validation';
import configuration from './configuration';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema: configValidationSchema,
            validationOptions: {
                allowUnknown: true,
                abortEarly: false,
            },
            envFilePath: process.env.BUN_ENV === 'dev' ? '.env.dev' : '.env',
        }),
    ],
})
export class ConfigModule { }
