import { Module } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { InfraModule } from 'src/infra/infra.module';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { AccountsRepository } from '../accounts/accounts.repository';

@Module({
  imports: [InfraModule],
  providers: [
    ProfilesRepository,
    ProfilesRepository,
    AccountsRepository,
    PrismaService,
    ProfilesService,
  ],
  exports: [ProfilesService, ProfilesRepository],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
