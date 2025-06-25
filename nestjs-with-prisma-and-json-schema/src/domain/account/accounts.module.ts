import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountsRepository } from './accounts.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ErrorHandlerService } from 'src/infra/error-handler/error-handler.service';

@Module({
  providers: [
    AccountsService,
    AccountsRepository,
    PrismaService,
    ErrorHandlerService,
  ],
  controllers: [AccountsController],
})
export class AccountsModule {}
