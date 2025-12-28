import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: 'Bad Request' })
    message: string
}
