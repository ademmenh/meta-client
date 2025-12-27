import { Injectable } from '@nestjs/common';
import { MetaClient } from '../meta/meta.client';
import {
    InstagramAccountDto,
    LinkedInstagramAccountDto,
    InstagramMediaListDto,
    InstagramInsightsResponseDto,
    InstagramCommentsListDto,
    CreateInstagramCommentDto,
    CreateCommentResponseDto,
    DeleteCommentResponseDto,
    GetInsightsQueryDto,
    InsightPeriod,
} from './dto/instagram.dto';

@Injectable()
export class InstagramService {
    constructor(private readonly metaClient: MetaClient) { }

    async getLinkedAccount(pageId: string): Promise<LinkedInstagramAccountDto> {
        return this.metaClient.get<LinkedInstagramAccountDto>(`/${pageId}`, {
            fields: 'instagram_business_account',
        });
    }

    async getProfile(igUserId: string): Promise<InstagramAccountDto> {
        return this.metaClient.get<InstagramAccountDto>(`/${igUserId}`, {
            fields: 'id,username,name,profile_picture_url,followers_count,follows_count,media_count,biography,website',
        });
    }

    async getMedia(igUserId: string): Promise<InstagramMediaListDto> {
        return this.metaClient.get<InstagramMediaListDto>(`/${igUserId}/media`, {
            fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
        });
    }

    async getMediaInsights(mediaId: string): Promise<InstagramInsightsResponseDto> {
        return this.metaClient.get<InstagramInsightsResponseDto>(`/${mediaId}/insights`, {
            metric: 'impressions,reach,engagement',
        });
    }

    async getAccountInsights(igUserId: string, query: GetInsightsQueryDto): Promise<InstagramInsightsResponseDto> {
        const params: Record<string, string> = {};

        params.metric = query.metric || 'impressions,reach,profile_views,follower_count';
        params.period = query.period || InsightPeriod.DAY;

        return this.metaClient.get<InstagramInsightsResponseDto>(`/${igUserId}/insights`, params);
    }

    async getMediaComments(mediaId: string): Promise<InstagramCommentsListDto> {
        return this.metaClient.get<InstagramCommentsListDto>(`/${mediaId}/comments`, {
            fields: 'id,text,username,timestamp,like_count,hidden',
        });
    }

    async createComment(mediaId: string, dto: CreateInstagramCommentDto): Promise<CreateCommentResponseDto> {
        return this.metaClient.post<CreateCommentResponseDto>(`/${mediaId}/comments`, {
            message: dto.message,
        });
    }

    async deleteComment(commentId: string): Promise<DeleteCommentResponseDto> {
        return this.metaClient.delete<DeleteCommentResponseDto>(`/${commentId}`);
    }
}
