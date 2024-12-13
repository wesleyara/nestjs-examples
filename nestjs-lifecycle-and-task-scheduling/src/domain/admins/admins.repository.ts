import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

type CreateAdminProps = Prisma.AdminCreateInput;

@Injectable()
export class AdminsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createAdmin(props: CreateAdminProps) {
    try {
      const response = await this.prismaService.admin.create({ data: props });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAdmin() {
    try {
      const response = await this.prismaService.admin.findFirst({
        where: {
          role: 'ADMIN',
        },
      });

      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
