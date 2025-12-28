import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PdfStatusResponseDto {
    @ApiProperty({ example: 'completed' })
    @Expose()
    status: string;

    @ApiProperty({ example: 'https://example.com/file.pdf', nullable: true })
    @Expose()
    url?: string;

    @ApiProperty({ example: 100, nullable: true })
    @Expose()
    progress?: number;
}
