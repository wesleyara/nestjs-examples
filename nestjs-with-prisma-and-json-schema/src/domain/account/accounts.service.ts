import { Inject, Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountProps } from './interfaces/accounts.interface';

@Injectable()
export class AccountsService {
  @Inject(AccountsRepository)
  private readonly accountRepository: AccountsRepository;

  async createAccount(data: CreateAccountProps) {
    return this.accountRepository.createAccount(data);
  }

  async findAccountById(accountId: string) {
    return this.accountRepository.findAccountById(accountId);
  }
}
