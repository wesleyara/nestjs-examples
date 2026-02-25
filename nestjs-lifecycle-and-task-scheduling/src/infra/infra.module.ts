import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CronModule } from './cron/cron.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, CronModule, ConfigModule.forRoot()],
  providers: [],
})
export class InfraModule {}
