import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { MetaModule } from './meta/meta.module';
import { PagesModule } from './pages/pages.module';
import { InstagramModule } from './instagram/instagram.module';
import { AdsModule } from './ads/ads.module';
import { MessengerModule } from './messenger/messenger.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
    imports: [
        ConfigModule,
        CommonModule,
        MetaModule,
        PagesModule,
        InstagramModule,
        AdsModule,
        MessengerModule,
        WhatsappModule,
        WebhooksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
