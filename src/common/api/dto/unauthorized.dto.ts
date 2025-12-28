import { ApiProperty } from '@nestjs/swagger';
import { ErrorDto } from './error.dto';

export class UnauthorizedDto extends ErrorDto {
    @ApiProperty({ example: 401 })
    declare statusCode: number;

    @ApiProperty({ example: 'Unauthorized' })
    declare message: string;
}
