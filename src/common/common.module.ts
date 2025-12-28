import { Module, Global } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MetaExceptionFilter } from './filters/meta-exception.filter';

@Global()
@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: MetaExceptionFilter,
        },
    ],
    exports: [],
})
export class CommonModule { }
