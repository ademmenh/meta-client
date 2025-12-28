import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';
import { NotFoundDto } from '../dto/not-found.dto';
import { InternalServerErrorDto } from '../dto/internal-server-error.dto';
import { ForbiddenDto } from '../dto/forbidden.dto';
import { EmptyDto } from '../dto/empty.dto';

export const ApiEmptyDto = (): MethodDecorator => {
    return applyDecorators(
        ApiOkResponse({
            type: EmptyDto
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
            type: BadRequestDto,
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
            type: UnauthorizedDto,
        }),
        ApiResponse({
            status: 403,
            description: 'Forbidden',
            type: ForbiddenDto,
        }),
        ApiResponse({
            status: 404,
            description: 'Resource not found',
            type: NotFoundDto,
        }),
        ApiResponse({
            status: 500,
            description: 'Internal Server Error',
            type: InternalServerErrorDto,
        })
    );
};
