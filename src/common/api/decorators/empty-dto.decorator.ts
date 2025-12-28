import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { EmptyDto } from '../dto/empty.dto';
import { ErrorDto } from '../dto/error.dto';

export const ApiEmptyDto = (): MethodDecorator => {
    return applyDecorators(
        ApiOkResponse({
            type: EmptyDto
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
            type: ErrorDto,
        }),
    );
};
