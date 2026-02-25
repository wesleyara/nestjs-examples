import { Module } from '@nestjs/common';
import { AccountProfileService } from './account-profile.service';
import { AccountProfileRepository } from './account-profile.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [AccountProfileService, AccountProfileRepository, PrismaService],
  exports: [AccountProfileService],
})
export class AccountProfileModule {}
