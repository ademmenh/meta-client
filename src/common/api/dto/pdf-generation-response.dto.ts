import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PdfGenerationResponseDto {
    @ApiProperty({ example: 'started' })
    @Expose()
    status: string;
}
