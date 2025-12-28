import { IsOptional, IsString, IsIn } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
    @Expose()
    @ApiProperty({ example: '1234567890' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'My Awesome Page' })
    name: string;

    @Expose()
    @ApiProperty({ example: 'Community', required: false })
    category?: string;

    @Expose()
    @ApiProperty({ required: false })
    category_list?: { id: string; name: string }[];

    @Expose()
    @ApiProperty({ example: 'EAAB...', required: false })
    access_token?: string;

    @Expose()
    @ApiProperty({ example: ['MANAGE', 'ADVERTISE'], required: false })
    tasks?: string[];
}

export class PageListResponseDto {
    @Expose()
    @ApiProperty({ type: [PageDto] })
    data: PageDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
}

export class GetPageQueryDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'id,name,category,access_token', required: false })
    fields?: string;
}
