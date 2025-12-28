import { ApiProperty } from '@nestjs/swagger';
import { ErrorDto } from './error.dto';

export class BadRequestDto extends ErrorDto {
    @ApiProperty({ example: 400 })
    declare statusCode: number;

    @ApiProperty({ example: 'Validation failed' })
    declare message: string
}
