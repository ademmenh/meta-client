import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
} from '@nestjs/common';
import { InstagramService } from './instagram.service';
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
} from './dto/instagram.dto';

@Controller('instagram')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) { }

    @Get('accounts/:pageId')
    async getLinkedAccount(@Param('pageId') pageId: string): Promise<LinkedInstagramAccountDto> {
        return this.instagramService.getLinkedAccount(pageId);
    }

    @Get(':id')
    async getProfile(@Param('id') id: string): Promise<InstagramAccountDto> {
        return this.instagramService.getProfile(id);
    }

    @Get(':id/media')
    async getMedia(@Param('id') id: string): Promise<InstagramMediaListDto> {
        return this.instagramService.getMedia(id);
    }

    @Get(':id/insights')
    async getAccountInsights(
        @Param('id') id: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<InstagramInsightsResponseDto> {
        return this.instagramService.getAccountInsights(id, query);
    }

    @Get('media/:mediaId/insights')
    async getMediaInsights(@Param('mediaId') mediaId: string): Promise<InstagramInsightsResponseDto> {
        return this.instagramService.getMediaInsights(mediaId);
    }

    @Get('media/:mediaId/comments')
    async getMediaComments(@Param('mediaId') mediaId: string): Promise<InstagramCommentsListDto> {
        return this.instagramService.getMediaComments(mediaId);
    }

    @Post('media/:mediaId/comments')
    async createComment(
        @Param('mediaId') mediaId: string,
        @Body() dto: CreateInstagramCommentDto,
    ): Promise<CreateCommentResponseDto> {
        return this.instagramService.createComment(mediaId, dto);
    }

    @Delete('comments/:commentId')
    async deleteComment(@Param('commentId') commentId: string): Promise<DeleteCommentResponseDto> {
        return this.instagramService.deleteComment(commentId);
    }
}
