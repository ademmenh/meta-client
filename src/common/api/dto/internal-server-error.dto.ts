import { ApiProperty } from '@nestjs/swagger';
import { ErrorDto } from './error.dto';

export class InternalServerErrorDto extends ErrorDto {
    @ApiProperty({ example: 500 })
    declare statusCode: number;

    @ApiProperty({ example: 'Internal Server Error' })
    declare message: string;
}
