import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientsRepository } from './clients.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { InfraModule } from 'src/infra/infra.module';
import { AccountsRepository } from '../accounts/accounts.repository';
import { ProfilesRepository } from '../profiles/profiles.repository';

@Module({
  imports: [InfraModule],
  providers: [
    ClientsService,
    ClientsRepository,
    ProfilesRepository,
    AccountsRepository,
    PrismaService,
  ],
  controllers: [ClientsController],
})
export class ClientsModule {}
