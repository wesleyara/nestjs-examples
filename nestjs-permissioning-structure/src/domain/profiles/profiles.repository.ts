import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateProfileProps } from './interfaces/profiles.interface';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(data: CreateProfileProps) {
    try {
      const profile = await this.prisma.profile.create({
        data,
      });

      return profile;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao criar perfil');
    }
  }

  async getProfiles() {
    try {
      const profiles = await this.prisma.profile.findMany({
        include: {
          profileEndpoints: {
            include: {
              endpoint: true,
            },
          },
        },
      });

      return profiles;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar perfis');
    }
  }
}
