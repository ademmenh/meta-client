import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiQuery, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { BadRequestDto } from '../dto/bad-request.dto';
import { UnauthorizedDto } from '../dto/unauthorized.dto';
import { NotFoundDto } from '../dto/not-found.dto';
import { InternalServerErrorDto } from '../dto/internal-server-error.dto';
import { ForbiddenDto } from '../dto/forbidden.dto';

export interface IPaginatedDto {
    type: any;
    status?: number;
    description?: string;
}

export const ApiPaginatedDto = (param: IPaginatedDto): MethodDecorator => {
    return applyDecorators(
        ApiExtraModels(param.type),
        ApiQuery({ name: 'after', type: String, required: false, description: 'The cursor for the next page' }),
        ApiQuery({ name: 'before', type: String, required: false, description: 'The cursor for the previous page' }),
        ApiQuery({ name: 'limit', type: Number, required: false, example: 10 }),
        ApiOkResponse({
            schema: {
                properties: {
                    statusCode: { type: 'number', example: param.status || 200 },
                    message: { type: 'string', example: param.description || 'Success' },
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(param.type) }
                    },
                    paging: {
                        properties: {
                            cursors: {
                                properties: {
                                    before: { type: 'string' },
                                    after: { type: 'string' }
                                }
                            },
                            next: { type: 'string' },
                            previous: { type: 'string' }
                        }
                    }
                }
            }
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
