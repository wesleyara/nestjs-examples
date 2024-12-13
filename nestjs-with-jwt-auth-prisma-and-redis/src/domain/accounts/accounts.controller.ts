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
      throw new HttpException(
        {
          statusCode: error.status || 500,
          message: error.message,
        },
        error.status || 500,
      );
    }
  }

  @Post('create')
  @HttpCode(201)
  async createAccount(@Body() data: CreateAccountDto) {
    try {
      const response = await this.accountsService.createAccount(data);

      return response;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || 500,
          message: error.message,
        },
        error.status || 500,
      );
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: CreateAccountDto) {
    try {
      const token = await this.accountsService.login(data);

      return {
        token,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: error.status || 500,
          message: error.message,
        },
        error.status || 500,
      );
    }
  }
}
