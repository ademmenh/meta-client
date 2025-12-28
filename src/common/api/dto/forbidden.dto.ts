import { ApiProperty } from '@nestjs/swagger';
import { ErrorDto } from './error.dto';

export class ForbiddenDto extends ErrorDto {
    @ApiProperty({ example: 403 })
    declare statusCode: number;

    @ApiProperty({ example: 'Forbidden' })
    declare message: string;
}
