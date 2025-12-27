import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { PageDto, PageListResponseDto, GetPageQueryDto } from './dto/page.dto';
import { CreatePostDto, PostDto, PostListResponseDto, CreatePostResponseDto, DeletePostResponseDto } from './dto/post.dto';
import { CreateCommentDto, CommentListResponseDto, CreateCommentResponseDto, DeleteCommentResponseDto } from './dto/comment.dto';
import { SubscribeWebhookDto, WebhookSubscriptionResponseDto } from './dto/webhook.dto';

@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Get()
    async listPages(): Promise<PageListResponseDto> {
        return this.pagesService.listPages();
    }

    @Get(':id')
    async getPage(
        @Param('id') id: string,
        @Query() query: GetPageQueryDto,
    ): Promise<PageDto> {
        return this.pagesService.getPage(id, query.fields);
    }

    @Post(':id/posts')
    async createPost(
        @Param('id') pageId: string,
        @Body() dto: CreatePostDto,
    ): Promise<CreatePostResponseDto> {
        return this.pagesService.createPost(pageId, dto);
    }

    @Get(':id/posts')
    async listPosts(@Param('id') pageId: string): Promise<PostListResponseDto> {
        return this.pagesService.listPosts(pageId);
    }

    @Get(':id/posts/:postId')
    async getPost(@Param('postId') postId: string): Promise<PostDto> {
        return this.pagesService.getPost(postId);
    }

    @Delete(':id/posts/:postId')
    async deletePost(@Param('postId') postId: string): Promise<DeletePostResponseDto> {
        return this.pagesService.deletePost(postId);
    }

    @Get(':id/posts/:postId/comments')
    async listComments(@Param('postId') postId: string): Promise<CommentListResponseDto> {
        return this.pagesService.listComments(postId);
    }

    @Post(':id/posts/:postId/comments')
    async createComment(
        @Param('postId') postId: string,
        @Body() dto: CreateCommentDto,
    ): Promise<CreateCommentResponseDto> {
        return this.pagesService.createComment(postId, dto);
    }

    @Delete(':id/comments/:commentId')
    async deleteComment(@Param('commentId') commentId: string): Promise<DeleteCommentResponseDto> {
        return this.pagesService.deleteComment(commentId);
    }

    @Post(':id/subscriptions')
    async subscribeToWebhooks(
        @Param('id') pageId: string,
        @Body() dto: SubscribeWebhookDto,
    ): Promise<WebhookSubscriptionResponseDto> {
        return this.pagesService.subscribeToWebhooks(pageId, dto);
    }

    @Delete(':id/subscriptions')
    async unsubscribeFromWebhooks(@Param('id') pageId: string): Promise<WebhookSubscriptionResponseDto> {
        return this.pagesService.unsubscribeFromWebhooks(pageId);
    }
}
