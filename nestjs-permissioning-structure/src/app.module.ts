import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { DomainModule } from './domain/domain.module';
import { CronjobModule } from './cronjob/cronjob.module';

@Module({
  imports: [InfraModule, DomainModule, CronjobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
