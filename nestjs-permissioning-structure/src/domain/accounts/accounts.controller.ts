import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/accounts.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';
import { AuthenticatedRequest } from './interface/accounts.interface';
import { HttpError } from 'src/app.interface';

@Controller('accounts')
export class AccountsController {
  @Inject(AccountsService)
  private accountsService: AccountsService;

  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAccount(@Req() request: AuthenticatedRequest) {
    try {
      return request.user;
    } catch (error) {
      const err = error as HttpError;
      throw new HttpException(
        {
          statusCode: err.status || 500,
          message: err.message,
        },
        err.status || 500,
      );
    }
  }

  @Post('create')
  @HttpCode(201)
  async createAccount(@Body() data: CreateAccountDto) {
    return await this.accountsService.createAccount(data);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: CreateAccountDto) {
    return this.accountsService.login(data);
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.accountsService.refreshToken(refreshToken);
  }
}
