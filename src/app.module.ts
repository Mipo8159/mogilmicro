import { ProvidersModule } from '@lib/providers';
import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DomainsModule } from './domains/domains.module';

@Module({
  imports: [ProvidersModule, SharedModule, ApiModule, DomainsModule],
})
export class AppModule {}
