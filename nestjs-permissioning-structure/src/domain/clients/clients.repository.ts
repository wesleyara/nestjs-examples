import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import {
  CreateClientProps,
  GetClientsWhere,
} from './interfaces/clients.interface';
import { CreateClientDto } from './dto/clients.dto';

@Injectable()
export class ClientsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(data: CreateClientDto) {
    try {
      const response = await this.prisma.client.create({
        data,
      });

      return response;
    } catch (error) {
      console.log(error);
      console.log('Erro ao criar cliente');
      throw new InternalServerErrorException('Erro ao criar cliente');
    }
  }

  async getClients(data: GetClientsWhere) {
    try {
      const response = await this.prisma.client.findMany({
        where: data,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar clientes');
    }
  }

  async getClientByDocument(document: string) {
    try {
      const response = await this.prisma.client.findUnique({
        where: {
          document,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar cliente');
    }
  }

  async getClientById(id: string) {
    try {
      const response = await this.prisma.client.findUnique({
        where: {
          id,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar cliente');
    }
  }

  async deleteClient(id: string) {
    try {
      const response = await this.prisma.client.delete({
        where: {
          id,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao deletar cliente');
    }
  }

  async updateClient(id: string, data: CreateClientProps) {
    try {
      const response = await this.prisma.client.update({
        where: {
          id,
        },
        data,
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao atualizar cliente');
    }
  }
}
