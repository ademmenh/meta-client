import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
} from '@nestjs/common';
import { ApiDto } from '../common/api/decorators/api.dto.decorator';
import { ApiPaginatedDto } from '../common/api/decorators/paginated-dto.decorator';
import { RBody } from '../common/api/decorators/response-transform.decorator';
import { InstagramService } from './instagram.service';
import {
    InstagramAccountDto,
    LinkedInstagramAccountDto,
    InstagramMediaListDto,
    InstagramMediaDto,
    InstagramInsightsResponseDto,
    InstagramInsightDto,
    InstagramCommentsListDto,
    InstagramCommentDto,
    CreateInstagramCommentDto,
    CreateCommentResponseDto,
    DeleteCommentResponseDto,
    GetInsightsQueryDto,
} from './dto/instagram.dto';

@Controller('instagram')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) { }

    @Get('accounts/:pageId')
    @ApiDto({ type: LinkedInstagramAccountDto })
    @RBody({ dto: LinkedInstagramAccountDto })
    async getLinkedAccount(@Param('pageId') pageId: string): Promise<LinkedInstagramAccountDto> {
        return this.instagramService.getLinkedAccount(pageId);
    }

    @Get(':id')
    @ApiDto({ type: InstagramAccountDto })
    @RBody({ dto: InstagramAccountDto })
    async getProfile(@Param('id') id: string): Promise<InstagramAccountDto> {
        return this.instagramService.getProfile(id);
    }

    @Get(':id/media')
    @ApiPaginatedDto({ type: InstagramMediaDto })
    @RBody({ dto: InstagramMediaDto })
    async getMedia(@Param('id') id: string): Promise<InstagramMediaListDto> {
        return this.instagramService.getMedia(id);
    }

    @Get(':id/insights')
    @ApiPaginatedDto({ type: InstagramInsightDto })
    @RBody({ dto: InstagramInsightDto })
    async getAccountInsights(
        @Param('id') id: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<InstagramInsightsResponseDto> {
        return this.instagramService.getAccountInsights(id, query);
    }

    @Get('media/:mediaId/insights')
    @ApiPaginatedDto({ type: InstagramInsightDto })
    @RBody({ dto: InstagramInsightDto })
    async getMediaInsights(@Param('mediaId') mediaId: string): Promise<InstagramInsightsResponseDto> {
        return this.instagramService.getMediaInsights(mediaId);
    }

    @Get('media/:mediaId/comments')
    @ApiPaginatedDto({ type: InstagramCommentDto })
    @RBody({ dto: InstagramCommentDto })
    async getMediaComments(@Param('mediaId') mediaId: string): Promise<InstagramCommentsListDto> {
        return this.instagramService.getMediaComments(mediaId);
    }

    @Post('media/:mediaId/comments')
    @ApiDto({ type: CreateCommentResponseDto })
    @RBody({ dto: CreateCommentResponseDto })
    async createComment(
        @Param('mediaId') mediaId: string,
        @Body() dto: CreateInstagramCommentDto,
    ): Promise<CreateCommentResponseDto> {
        return this.instagramService.createComment(mediaId, dto);
    }

    @Delete('comments/:commentId')
    @ApiDto({ type: DeleteCommentResponseDto })
    @RBody({ dto: DeleteCommentResponseDto })
    async deleteComment(@Param('commentId') commentId: string): Promise<DeleteCommentResponseDto> {
        return this.instagramService.deleteComment(commentId);
    }
}
