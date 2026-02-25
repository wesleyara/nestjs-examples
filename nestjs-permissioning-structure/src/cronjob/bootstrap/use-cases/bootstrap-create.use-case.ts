import { Inject, Injectable } from '@nestjs/common';
import { EndpointsService } from 'src/domain/endpoints/endpoints.service';
import {
  defaultProfiles,
  defaultEndpoints,
  defaultAccount,
} from '../bootstrap.mocks';
import { ProfilesService } from 'src/domain/profiles/profiles.service';
import { AccountsService } from 'src/domain/accounts/accounts.service';

@Injectable()
export class BootstrapCreateUseCase {
  @Inject(EndpointsService)
  private readonly endpointsService: EndpointsService;
  @Inject(ProfilesService)
  private readonly profilesService: ProfilesService;
  @Inject(AccountsService)
  private readonly accountsService: AccountsService;

  async execute() {
    console.log('Bootstrap creation logic in progress...');
    await this.createDefaultEndpoints();
    await this.createDefaultProfiles();
    await this.createDefaultAccounts();
    console.log('Bootstrap creation completed.');
  }

  async createDefaultEndpoints() {
    console.log('Creating default endpoints...');
    const existingEndpoints = await this.endpointsService.getEndpoints();
    const endpointsToCreate = defaultEndpoints.filter((endpoint) => {
      return !existingEndpoints.some(
        (existingEndpoint) =>
          existingEndpoint.path === endpoint.path &&
          existingEndpoint.method === endpoint.method,
      );
    });

    for (const endpoint of endpointsToCreate) {
      await this.endpointsService.createEndpoint(endpoint);
      console.log(`Endpoint created: ${endpoint.method} ${endpoint.path}`);
    }

    console.log('Default endpoints creation completed.');
  }

  async createDefaultProfiles() {
    console.log('Creating default profiles...');
    const existingProfiles = await this.profilesService.getProfiles();
    const profilesToCreate = defaultProfiles.filter((profile) => {
      return !existingProfiles.some(
        (existingProfile) => existingProfile.name === profile,
      );
    });

    for (const profile of profilesToCreate) {
      await this.profilesService.createProfile({
        name: profile,
      });
      console.log(`Profile created: ${profile}`);
    }

    console.log('Default profiles creation completed.');
  }

  async createDefaultAccounts() {
    console.log('Creating default accounts...');
    const existingAccounts = await this.accountsService.getAccountByUsername(
      defaultAccount.username,
    );

    if (!existingAccounts) {
      await this.accountsService.createAccount(defaultAccount);
      console.log(`Account created: ${defaultAccount.username}`);
    }

    console.log('Default accounts creation completed.');
  }
}
