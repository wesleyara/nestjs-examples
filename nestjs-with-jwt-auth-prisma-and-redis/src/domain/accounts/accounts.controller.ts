import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/accounts.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';
import { AuthenticatedRequest } from './interface/accounts.interface';

@Controller('accounts')
export class AccountsController {
  @Inject(AccountsService)
  private accountsService: AccountsService;

  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAccount(@Req() request: AuthenticatedRequest) {
    return request.user;
  }

  @Post('create')
  @HttpCode(201)
  async createAccount(@Body() data: CreateAccountDto) {
    return this.accountsService.createAccount(data);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: CreateAccountDto) {
    const token = await this.accountsService.login(data);

    return {
      token,
    };
  }
}
