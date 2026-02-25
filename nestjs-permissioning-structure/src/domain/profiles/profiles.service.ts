import { Inject, Injectable } from '@nestjs/common';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileProps } from './interfaces/profiles.interface';

@Injectable()
export class ProfilesService {
  @Inject(ProfilesRepository)
  private profilesRepository: ProfilesRepository;

  async createProfile(props: CreateProfileProps) {
    const profile = await this.profilesRepository.createProfile(props);

    return { message: 'Perfil criado com sucesso', data: profile };
  }

  async getProfiles() {
    return this.profilesRepository.getProfiles();
  }
}
