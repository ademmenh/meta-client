import { ApiProperty } from '@nestjs/swagger';
import { ErrorDto } from './error.dto';

export class NotFoundDto extends ErrorDto {
    @ApiProperty({ example: 404 })
    declare statusCode: number;

    @ApiProperty({ example: 'Resource not found' })
    declare message: string;
}
