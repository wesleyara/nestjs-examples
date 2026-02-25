import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class AccountProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAccountProfile(accountId: string, profileId: string) {
    try {
      const accountProfile = await this.prisma.accountProfile.create({
        data: {
          accountId,
          profileId,
        },
      });
      return accountProfile;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao criar conta-perfil');
    }
  }

  async getAccountProfiles() {
    try {
      const accountProfiles = await this.prisma.accountProfile.findMany();
      return accountProfiles;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao buscar conta-perfil');
    }
  }
}
