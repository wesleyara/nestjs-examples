import { Module } from '@nestjs/common';
import { ProfileEndpointService } from './profile-endpoint.service';
import { ProfileEndpointRepository } from './profile-endpoint.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [ProfileEndpointService, ProfileEndpointRepository, PrismaService],
  exports: [ProfileEndpointService],
})
export class ProfileEndpointModule {}
