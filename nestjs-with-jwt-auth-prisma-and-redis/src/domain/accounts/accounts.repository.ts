import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateAccountProps } from './interface/accounts.interface';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(data: CreateAccountProps) {
    try {
      const account = await this.prisma.account.create({
        data,
      });

      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao criar conta');
    }
  }

  async findAccountByEmail(email: string) {
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          email,
        },
      });

      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar conta');
    }
  }

  async findAccountById(id: string) {
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar conta');
    }
  }
}
