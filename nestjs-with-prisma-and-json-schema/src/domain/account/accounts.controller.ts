import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/accounts.dto';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  @Inject(AccountsService)
  private readonly accountService: AccountsService;

  @Post('create')
  createAccount(@Body() body: CreateAccountDto) {
    return this.accountService.createAccount(body);
  }

  @Get(':id')
  findAccountById(@Param() params: { id: string }) {
    return this.accountService.findAccountById(params.id);
  }
}
