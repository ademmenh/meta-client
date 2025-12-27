import { Controller, Get, Param, Query, Delete, HttpCode } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { GetInsightsQueryDto, InsightsResponseDto } from './dto/insight.dto';

@Controller('pages/:pageId/insights')
export class InsightsController {
    constructor(private readonly insightsService: InsightsService) { }

    @Get()
    async getPageInsights(
        @Param('pageId') pageId: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<InsightsResponseDto> {
        return this.insightsService.getPageInsights(pageId, query);
    }

    @Delete('cache')
    @HttpCode(204)
    clearCache(): void {
        this.insightsService.clearCache();
    }
}
