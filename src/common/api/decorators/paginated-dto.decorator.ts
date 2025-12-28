import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiQuery, getSchemaPath, ApiExtraModels } from '@nestjs/swagger';
import { ErrorDto } from '../dto/error.dto';

export interface IPaginatedDto {
    type: any;
    status?: number;
    description?: string;
}

export const ApiPaginatedDto = (param: IPaginatedDto): MethodDecorator => {
    return applyDecorators(
        ApiExtraModels(param.type),
        ApiExtraModels(ErrorDto),
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
            type: ErrorDto,
        }),
    );
};
