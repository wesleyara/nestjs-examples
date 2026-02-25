import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';
import { ProfileGuard } from 'src/guards/profile-guard.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto, GetClientsDto } from './dto/clients.dto';
import { PermissionGuard } from 'src/guards/permission-guard.guard';

@Controller('clients')
export class ClientsController {
  @Inject(ClientsService)
  private clientsService: ClientsService;

  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, ProfileGuard, PermissionGuard)
  async getClients(@Query() queries: GetClientsDto) {
    return this.clientsService.getClients(queries);
  }

  @Post('create')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, ProfileGuard, PermissionGuard)
  async createClient(@Body() data: CreateClientDto) {
    return this.clientsService.createClient(data);
  }
}
