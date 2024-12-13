import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateAccountProps } from './interface/accounts.interface';
import { ErrorHandlerService } from 'src/infra/error-handler/error-handler.service';
import { ErrorStatus } from 'src/infra/error-handler/error-handler.interface';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  @Inject(ErrorHandlerService)
  private errorHandlerService: ErrorHandlerService;

  async createAccount(data: CreateAccountProps) {
    try {
      const account = await this.prisma.account.create({
        data,
      });

      return account;
    } catch (error) {
      console.log(error);
      this.errorHandlerService.dispatch({
        message: 'Erro ao criar conta',
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
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
      this.errorHandlerService.dispatch({
        message: 'Erro ao buscar conta',
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
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
      this.errorHandlerService.dispatch({
        message: 'Erro ao buscar conta',
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
