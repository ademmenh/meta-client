import { IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @IsString()
    @ApiProperty({ example: 'Hello from Meta Client!' })
    message: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'https://example.com', required: false })
    link?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ example: true, required: false })
    published?: boolean;

    @IsOptional()
    @IsDateString()
    @ApiProperty({ example: '2023-12-31T23:59:59Z', required: false })
    scheduled_publish_time?: string;
}

export class PostDto {
    @Expose()
    @ApiProperty({ example: '1234567890_987654321' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'This is a post message', required: false })
    message?: string;

    @Expose()
    @ApiProperty({ example: 'This is a story', required: false })
    story?: string;

    @Expose()
    @ApiProperty({ example: '2023-01-01T12:00:00+0000' })
    created_time: string;

    @Expose()
    @ApiProperty({ example: '2023-01-02T12:00:00+0000', required: false })
    updated_time?: string;

    @Expose()
    @ApiProperty({ example: 'https://pic.url/img.jpg', required: false })
    full_picture?: string;

    @Expose()
    @ApiProperty({ example: 'https://fb.com/posts/1234567890', required: false })
    permalink_url?: string;

    @Expose()
    @ApiProperty({ required: false })
    shares?: { count: number };
}

export class PostListResponseDto {
    @Expose()
    @ApiProperty({ type: [PostDto] })
    data: PostDto[];

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

export class CreatePostResponseDto {
    @Expose()
    @ApiProperty({ example: '1234567890_987654321' })
    id: string;
}

export class DeletePostResponseDto {
    @Expose()
    @ApiProperty({ example: true })
    success: boolean;
}
