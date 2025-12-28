import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseCommonMetadata } from '@nestjs/swagger';
import { ErrorDto } from '../dto/error.dto';
import { SuccessDtoF } from '../dto/dto';

export const ApiDto = (params: ApiResponseCommonMetadata): MethodDecorator => {
    return applyDecorators(
        ApiResponse({
            status: params?.status || 200,
            description: params?.description || 'Response Successful',
            type: SuccessDtoF(params.type)
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
            type: ErrorDto,
        }),
    );
};
