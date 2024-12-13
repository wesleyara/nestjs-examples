import { Module } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Module({
  providers: [AdminsRepository, PrismaService],
  exports: [AdminsRepository],
})
export class AdminsModule {}
