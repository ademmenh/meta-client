import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InstagramAccountDto {
    @Expose()
    @ApiProperty({ example: '17841400000000001' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'my_ig_username' })
    username: string;

    @Expose()
    @ApiProperty({ example: 'My Instagram Name', required: false })
    name?: string;

    @Expose()
    @ApiProperty({ example: 'https://pic.url/123.jpg', required: false })
    profile_picture_url?: string;

    @Expose()
    @ApiProperty({ example: 1200, required: false })
    followers_count?: number;

    @Expose()
    @ApiProperty({ example: 300, required: false })
    follows_count?: number;

    @Expose()
    @ApiProperty({ example: 150, required: false })
    media_count?: number;

    @Expose()
    @ApiProperty({ example: 'My bio here', required: false })
    biography?: string;

    @Expose()
    @ApiProperty({ example: 'https://mysite.com', required: false })
    website?: string;
}

export class LinkedInstagramAccountDto {
    @Expose()
    @ApiProperty({ required: false })
    instagram_business_account?: {
        id: string;
    };

    @Expose()
    @ApiProperty({ example: '17841400000000001' })
    id: string;
}

export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    CAROUSEL_ALBUM = 'CAROUSEL_ALBUM',
}

export class InstagramMediaDto {
    @Expose()
    @ApiProperty({ example: '17841400000000002' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Beautiful sunset!', required: false })
    caption?: string;

    @Expose()
    @ApiProperty({ enum: MediaType, example: MediaType.IMAGE })
    media_type: MediaType;

    @Expose()
    @ApiProperty({ example: 'https://media.url/img.jpg', required: false })
    media_url?: string;

    @Expose()
    @ApiProperty({ example: 'https://media.url/thumb.jpg', required: false })
    thumbnail_url?: string;

    @Expose()
    @ApiProperty({ example: 'https://instagr.am/p/abc123', required: false })
    permalink?: string;

    @Expose()
    @ApiProperty({ example: '2023-01-01T12:00:00+0000' })
    timestamp: string;

    @Expose()
    @ApiProperty({ example: 45, required: false })
    like_count?: number;

    @Expose()
    @ApiProperty({ example: 12, required: false })
    comments_count?: number;
}

export class InstagramMediaListDto {
    @Expose()
    @ApiProperty({ type: [InstagramMediaDto] })
    data: InstagramMediaDto[];

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

export class InsightValueDto {
    @Expose()
    @ApiProperty({ example: 50 })
    value: number;

    @Expose()
    @ApiProperty({ example: '2023-01-01T00:00:00+0000', required: false })
    end_time?: string;
}

export class InstagramInsightDto {
    @Expose()
    @ApiProperty({ example: 'reach' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Reach' })
    name: string;

    @Expose()
    @ApiProperty({ example: 'day' })
    period: string;

    @Expose()
    @ApiProperty({ example: 'Daily Reach', required: false })
    title?: string;

    @Expose()
    @ApiProperty({ example: 'The number of unique accounts that have seen your media', required: false })
    description?: string;

    @Expose()
    @ApiProperty({ type: [InsightValueDto] })
    values: InsightValueDto[];
}

export class InstagramInsightsResponseDto {
    @Expose()
    @ApiProperty({ type: [InstagramInsightDto] })
    data: InstagramInsightDto[];
}

export enum InsightMetric {
    IMPRESSIONS = 'impressions',
    REACH = 'reach',
    PROFILE_VIEWS = 'profile_views',
    FOLLOWER_COUNT = 'follower_count',
}

export enum InsightPeriod {
    DAY = 'day',
    WEEK = 'week',
    DAYS_28 = 'days_28',
    LIFETIME = 'lifetime',
}

export class GetInsightsQueryDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'reach', required: false })
    metric?: string;

    @IsOptional()
    @IsEnum(InsightPeriod)
    @ApiProperty({ enum: InsightPeriod, example: InsightPeriod.DAY, required: false })
    period?: InsightPeriod;
}

export class InstagramCommentDto {
    @Expose()
    @ApiProperty({ example: '17841400000000003' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Great post!' })
    text: string;

    @Expose()
    @ApiProperty({ example: 'user123', required: false })
    username?: string;

    @Expose()
    @ApiProperty({ example: '2023-01-01T12:00:00+0000' })
    timestamp: string;

    @Expose()
    @ApiProperty({ example: 5, required: false })
    like_count?: number;

    @Expose()
    @ApiProperty({ example: false, required: false })
    hidden?: boolean;
}

export class InstagramCommentsListDto {
    @Expose()
    @ApiProperty({ type: [InstagramCommentDto] })
    data: InstagramCommentDto[];

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

export class CreateInstagramCommentDto {
    @IsString()
    @ApiProperty({ example: 'This is my comment' })
    message: string;
}

export class CreateCommentResponseDto {
    @Expose()
    @ApiProperty({ example: '17841400000000003' })
    id: string;
}

export class DeleteCommentResponseDto {
    @Expose()
    @ApiProperty({ example: true })
    success: boolean;
}
