import { Module } from '@nestjs/common';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { CacheService } from '../common/services/cache.service';

@Module({
    controllers: [InsightsController],
    providers: [InsightsService, CacheService],
    exports: [InsightsService],
})
export class InsightsModule { }
