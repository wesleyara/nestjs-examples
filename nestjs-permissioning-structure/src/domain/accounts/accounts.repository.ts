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

  async findAccountByUsername(username: string, includePassword = false) {
    try {
      const account = await this.prisma.account.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          name: true,
          password: includePassword,
          accountProfiles: {
            select: {
              profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!account) {
        return null;
      }

      return {
        ...account,
        accountProfiles:
          account?.accountProfiles.map((ap) => {
            return {
              ...ap.profile,
            };
          }) || [],
      };
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
          username: true,
          name: true,
          accountProfiles: {
            select: {
              profile: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!account) {
        return null;
      }

      return {
        ...account,
        accountProfiles:
          account?.accountProfiles.map((ap) => {
            return {
              ...ap.profile,
            };
          }) || [],
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar conta');
    }
  }
}
