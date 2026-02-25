import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class ProfileEndpointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProfileEndpoints() {
    try {
      const response = await this.prisma.profileEndpoint.findMany();

      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao buscar conexões de perfil e endpoint',
      );
    }
  }

  async createProfileEndpoint(profileId: string, endpointId: string) {
    try {
      const response = await this.prisma.profileEndpoint.create({
        data: {
          profileId,
          endpointId,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao criar conexão de perfil e endpoint',
      );
    }
  }
}
