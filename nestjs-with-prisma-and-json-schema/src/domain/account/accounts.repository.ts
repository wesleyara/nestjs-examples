import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateAccountProps } from './interfaces/accounts.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ErrorHandlerService } from 'src/infra/error-handler/error-handler.service';
import { ErrorStatus } from 'src/infra/error-handler/error-handler.interface';

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  @Inject(ErrorHandlerService)
  private errorHandlerService: ErrorHandlerService;

  async createAccount(data: CreateAccountProps) {
    try {
      const account = await this.prisma.accounts.create({
        data,
      });

      return account;
    } catch (error) {
      this.errorHandlerService.dispatch({
        message: error.message || 'Error creating account',
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAccountById(accountId: string) {
    try {
      const account = await this.prisma.accounts.findUnique({
        where: { id: accountId },
      });

      if (!account) {
        this.errorHandlerService.dispatch({
          message: 'Account not found',
          status: ErrorStatus.NOT_FOUND,
        });
      }

      return account;
    } catch (error) {
      if (error.status && error.message) {
        throw error;
      }

      this.errorHandlerService.dispatch({
        message: error.message || 'Error finding account',
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
