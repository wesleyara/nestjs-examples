import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AccountsRepository } from './accounts.repository';
import { EncryptService } from 'src/infra/encrypt/encrypt.service';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { InfraModule } from 'src/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [AccountsController],
  providers: [
    PrismaService,
    EncryptService,
    AccountsRepository,
    AccountsService,
  ],
  exports: [AccountsRepository, AccountsService],
})
export class AccountsModule {}
