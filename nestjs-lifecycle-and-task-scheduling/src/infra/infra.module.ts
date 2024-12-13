import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [PrismaModule, CronModule],
  providers: [],
})
export class InfraModule {}
