import { Module } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsRepository } from './endpoints.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { InfraModule } from 'src/infra/infra.module';
import { AccountsRepository } from '../accounts/accounts.repository';

@Module({
  imports: [InfraModule],
  providers: [
    EndpointsService,
    EndpointsRepository,
    PrismaService,
    AccountsRepository,
  ],
  exports: [EndpointsService, EndpointsRepository],
})
export class EndpointsModule {}
