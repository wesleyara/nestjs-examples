import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
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
      console.error('Erro ao criar admin:', error);
      throw new InternalServerErrorException('Erro ao criar admin');
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
      console.error('Erro ao encontrar admin:', error);
      throw new InternalServerErrorException('Erro ao encontrar admin');
    }
  }
}
