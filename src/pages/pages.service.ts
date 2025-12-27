import { Injectable } from '@nestjs/common';
import { MetaClient } from '../meta/meta.client';
import { PageDto, PageListResponseDto } from './dto/page.dto';
import { CreatePostDto, PostDto, PostListResponseDto, CreatePostResponseDto, DeletePostResponseDto } from './dto/post.dto';
import { CreateCommentDto, CommentDto, CommentListResponseDto, CreateCommentResponseDto, DeleteCommentResponseDto } from './dto/comment.dto';
import { SubscribeWebhookDto, WebhookSubscriptionResponseDto } from './dto/webhook.dto';

@Injectable()
export class PagesService {
    constructor(private readonly metaClient: MetaClient) { }

    async listPages(): Promise<PageListResponseDto> {
        return this.metaClient.get<PageListResponseDto>('/me/accounts', {
            fields: 'id,name,category,category_list,access_token,tasks',
        });
    }

    async getPage(pageId: string, fields?: string): Promise<PageDto> {
        const defaultFields = 'id,name,category,category_list,access_token,tasks';
        return this.metaClient.get<PageDto>(`/${pageId}`, {
            fields: fields || defaultFields,
        });
    }

    async createPost(pageId: string, dto: CreatePostDto): Promise<CreatePostResponseDto> {
        const body: Record<string, unknown> = {
            message: dto.message,
        };

        if (dto.link) body.link = dto.link;
        if (dto.published !== undefined) body.published = dto.published;
        if (dto.scheduled_publish_time) body.scheduled_publish_time = dto.scheduled_publish_time;

        return this.metaClient.post<CreatePostResponseDto>(`/${pageId}/feed`, body);
    }

    async listPosts(pageId: string): Promise<PostListResponseDto> {
        return this.metaClient.get<PostListResponseDto>(`/${pageId}/feed`, {
            fields: 'id,message,story,created_time,updated_time,full_picture,permalink_url,shares',
        });
    }

    async getPost(postId: string): Promise<PostDto> {
        return this.metaClient.get<PostDto>(`/${postId}`, {
            fields: 'id,message,story,created_time,updated_time,full_picture,permalink_url,shares',
        });
    }

    async deletePost(postId: string): Promise<DeletePostResponseDto> {
        return this.metaClient.delete<DeletePostResponseDto>(`/${postId}`);
    }

    async listComments(postId: string): Promise<CommentListResponseDto> {
        return this.metaClient.get<CommentListResponseDto>(`/${postId}/comments`, {
            fields: 'id,message,from,created_time',
        });
    }

    async createComment(postId: string, dto: CreateCommentDto): Promise<CreateCommentResponseDto> {
        return this.metaClient.post<CreateCommentResponseDto>(`/${postId}/comments`, {
            message: dto.message,
        });
    }

    async deleteComment(commentId: string): Promise<DeleteCommentResponseDto> {
        return this.metaClient.delete<DeleteCommentResponseDto>(`/${commentId}`);
    }

    async subscribeToWebhooks(pageId: string, dto: SubscribeWebhookDto): Promise<WebhookSubscriptionResponseDto> {
        return this.metaClient.post<WebhookSubscriptionResponseDto>(`/${pageId}/subscribed_apps`, {
            subscribed_fields: dto.subscribed_fields,
        });
    }

    async unsubscribeFromWebhooks(pageId: string): Promise<WebhookSubscriptionResponseDto> {
        return this.metaClient.delete<WebhookSubscriptionResponseDto>(`/${pageId}/subscribed_apps`);
    }
}
