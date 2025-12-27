import { IsString, IsOptional, IsEnum } from 'class-validator';

export class InstagramAccountDto {
    id: string;
    username: string;
    name?: string;
    profile_picture_url?: string;
    followers_count?: number;
    follows_count?: number;
    media_count?: number;
    biography?: string;
    website?: string;
}

export class LinkedInstagramAccountDto {
    instagram_business_account?: {
        id: string;
    };
    id: string;
}

export enum MediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    CAROUSEL_ALBUM = 'CAROUSEL_ALBUM',
}

export class InstagramMediaDto {
    id: string;
    caption?: string;
    media_type: MediaType;
    media_url?: string;
    thumbnail_url?: string;
    permalink?: string;
    timestamp: string;
    like_count?: number;
    comments_count?: number;
}

export class InstagramMediaListDto {
    data: InstagramMediaDto[];
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
    value: number;
    end_time?: string;
}

export class InstagramInsightDto {
    id: string;
    name: string;
    period: string;
    title?: string;
    description?: string;
    values: InsightValueDto[];
}

export class InstagramInsightsResponseDto {
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
    metric?: string;

    @IsOptional()
    @IsEnum(InsightPeriod)
    period?: InsightPeriod;
}

export class InstagramCommentDto {
    id: string;
    text: string;
    username?: string;
    timestamp: string;
    like_count?: number;
    hidden?: boolean;
}

export class InstagramCommentsListDto {
    data: InstagramCommentDto[];
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
    message: string;
}

export class CreateCommentResponseDto {
    id: string;
}

export class DeleteCommentResponseDto {
    success: boolean;
}
