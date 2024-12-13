import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { DomainModule } from './domain/domain.module';
import { AppService } from './app.service';

@Module({
  imports: [InfraModule, DomainModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
