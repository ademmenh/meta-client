import { SetMetadata } from '@nestjs/common';

export interface IRBody {
    dto: any,
    statusCode?: number,
    message?: string,
}

export const RBody = (obj: IRBody) => SetMetadata('RBody', obj);
