import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { IRBody } from '../api/decorators/response-transform.decorator';

export class TransformResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler) {
        const reflector: IRBody | undefined = this.reflector.get('RBody', context.getHandler());
        if (!reflector || !reflector.dto) return next.handle();

        return next.handle().pipe(
            map((obj) => {
                let data
                if (obj) {
                    data = obj.data ?? obj
                    if (Array.isArray(data)) data = data.map((item) => plainToInstance(reflector.dto, item, { excludeExtraneousValues: true }));
                    else data = plainToInstance(reflector.dto, data, { excludeExtraneousValues: true });
                }

                return {
                    statusCode: reflector.statusCode || 200,
                    message: reflector.message || 'Request successful',
                    data,
                    paging: obj?.paging || obj?.pagination,
                };
            }),
        );
    }
}
