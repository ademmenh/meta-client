import { Controller, Get, Param, Query, Delete, HttpCode } from '@nestjs/common';
import { ApiDto } from '../common/api/decorators/api.dto.decorator';
import { ApiPaginatedDto } from '../common/api/decorators/paginated-dto.decorator';
import { ApiEmptyDto } from '../common/api/decorators/empty-dto.decorator';
import { RBody } from '../common/api/decorators/response-transform.decorator';
import { EmptyDto } from '../common/api/dto/empty.dto';
import { InsightsService } from './insights.service';
import { GetInsightsQueryDto, InsightsResponseDto, InsightDto } from './dto/insight.dto';

@Controller('pages/:pageId/insights')
export class InsightsController {
    constructor(private readonly insightsService: InsightsService) { }

    @Get()
    @ApiPaginatedDto({ type: InsightDto })
    @RBody({ dto: InsightDto })
    async getPageInsights(
        @Param('pageId') pageId: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<InsightsResponseDto> {
        return this.insightsService.getPageInsights(pageId, query);
    }

    @Delete('cache')
    @HttpCode(204)
    @ApiEmptyDto()
    @RBody({ dto: EmptyDto })
    clearCache(): void {
        this.insightsService.clearCache();
    }
}
