import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ErrorHandlerModule],
})
export class InfraModule {}
