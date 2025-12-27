import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { CacheService } from '../common/services/cache.service';

@Module({
    controllers: [AdsController],
    providers: [AdsService, CacheService],
    exports: [AdsService],
})
export class AdsModule { }
