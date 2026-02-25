import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEndpointProps } from './interfaces/endpoints.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class EndpointsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEndpoint(data: CreateEndpointProps) {
    try {
      const account = await this.prisma.endpoint.create({
        data,
      });

      return account;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao criar endpoint');
    }
  }

  async getEndpoints() {
    try {
      const endpoints = await this.prisma.endpoint.findMany();

      return endpoints;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar endpoints');
    }
  }

  async findEndpointsByPath(path: string) {
    try {
      const endpoints = await this.prisma.endpoint.findMany({
        where: {
          path,
        },
      });

      return endpoints;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao buscar endpoints por path',
      );
    }
  }

  async findEndpointById(id: string) {
    try {
      const endpoint = await this.prisma.endpoint.findUnique({
        where: {
          id,
        },
      });

      return endpoint;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar endpoint por id');
    }
  }
}
