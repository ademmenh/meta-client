import { Injectable, Logger } from '@nestjs/common';
import { MetaClient } from '../meta/meta.client';
import { CacheService } from '../common/services/cache.service';
import { GetInsightsQueryDto, InsightsResponseDto, InsightPeriod } from './dto/insight.dto';

@Injectable()
export class InsightsService {
    private readonly logger = new Logger(InsightsService.name);
    private readonly CACHE_TTL_SECONDS = 300;

    constructor(
        private readonly metaClient: MetaClient,
        private readonly cacheService: CacheService,
    ) { }

    async getPageInsights(pageId: string, query: GetInsightsQueryDto): Promise<InsightsResponseDto> {
        const cacheKey = this.buildCacheKey(pageId, query);

        const cached = this.cacheService.get<InsightsResponseDto>(cacheKey);
        if (cached) {
            this.logger.debug(`Cache hit for insights: ${cacheKey}`);
            return cached;
        }

        const params: Record<string, string> = {};

        if (query.metric) {
            params.metric = query.metric;
        } else {
            params.metric = 'page_impressions,page_engaged_users,page_fans,page_views_total';
        }

        if (query.period) {
            params.period = query.period;
        } else {
            params.period = InsightPeriod.DAY;
        }

        if (query.date_preset) {
            params.date_preset = query.date_preset;
        }

        const response = await this.metaClient.get<InsightsResponseDto>(`/${pageId}/insights`, params);

        this.cacheService.set(cacheKey, response, this.CACHE_TTL_SECONDS);
        this.logger.debug(`Cached insights: ${cacheKey}`);

        return response;
    }

    private buildCacheKey(pageId: string, query: GetInsightsQueryDto): string {
        const parts = [
            'insights',
            pageId,
            query.metric || 'default',
            query.period || 'day',
            query.date_preset || 'none',
        ];
        return parts.join(':');
    }

    clearCache(): void {
        this.cacheService.clear();
        this.logger.log('Insights cache cleared');
    }
}
