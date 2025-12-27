import { IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePostDto {
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    @IsDateString()
    scheduled_publish_time?: string;
}

export class PostDto {
    id: string;
    message?: string;
    story?: string;
    created_time: string;
    updated_time?: string;
    full_picture?: string;
    permalink_url?: string;
    shares?: { count: number };
}

export class PostListResponseDto {
    data: PostDto[];
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
    id: string;
}

export class DeletePostResponseDto {
    success: boolean;
}
