import { Inject, Injectable } from '@nestjs/common';
import { ProfileEndpointRepository } from './profile-endpoint.repository';

@Injectable()
export class ProfileEndpointService {
  @Inject(ProfileEndpointRepository)
  private profileEndpointRepository: ProfileEndpointRepository;

  async getProfileEndpoints() {
    return this.profileEndpointRepository.getProfileEndpoints();
  }

  async createProfileEndpoint(profileId: string, endpointId: string) {
    return this.profileEndpointRepository.createProfileEndpoint(
      profileId,
      endpointId,
    );
  }
}
