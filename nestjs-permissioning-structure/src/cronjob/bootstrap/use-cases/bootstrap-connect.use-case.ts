import { Inject, Injectable } from '@nestjs/common';
import { AccountsService } from 'src/domain/accounts/accounts.service';
import { EndpointsService } from 'src/domain/endpoints/endpoints.service';
import { ProfilesService } from 'src/domain/profiles/profiles.service';
import {
  defaultAccount,
  defaultAccountProfileConnections,
  defaultProfileEndpointConnections,
} from '../bootstrap.mocks';
import { AccountProfileService } from 'src/domain/account-profile/account-profile.service';
import { ProfileEndpointService } from 'src/domain/profile-endpoint/profile-endpoint.service';

@Injectable()
export class BootstrapConnectUseCase {
  @Inject(EndpointsService)
  private readonly endpointsService: EndpointsService;
  @Inject(ProfilesService)
  private readonly profilesService: ProfilesService;
  @Inject(AccountsService)
  private readonly accountsService: AccountsService;
  @Inject(AccountProfileService)
  private readonly accountProfileService: AccountProfileService;
  @Inject(ProfileEndpointService)
  private readonly profileEndpointService: ProfileEndpointService;

  async execute() {
    console.log('Bootstrap connection logic in progress...');
    await this.connectAccountProfiles();
    await this.connectProfileEndpoints();
  }

  async connectAccountProfiles() {
    console.log('Connecting accounts to profiles...');
    const account = await this.accountsService.getAccountByUsername(
      defaultAccountProfileConnections.username,
    );

    if (!account) {
      console.log(
        `Account with username "${defaultAccount.username}" not found. Skipping account-profile connection.`,
      );
      return;
    }

    if (!account.accountProfiles || account.accountProfiles.length === 0) {
      const profiles = await this.profilesService.getProfiles();
      const profile = profiles.find(
        (p) => p.name === defaultAccountProfileConnections.profileName,
      );

      if (profile) {
        await this.accountProfileService.createAccountProfile(
          account.id,
          profile.id,
        );
        console.log(
          `Connected account "${account.username}" to profile "${profile.name}"`,
        );
      }
    }

    console.log('Account to profile connections completed.');
  }

  async connectProfileEndpoints() {
    console.log('Connecting profiles to endpoints...');
    const profiles = await this.profilesService.getProfiles();
    const endpoints = await this.endpointsService.getEndpoints();

    for (const profileEndpoint of defaultProfileEndpointConnections) {
      const profile = profiles.find(
        (p) => p.name === profileEndpoint.profileName,
      );

      for (const endpoint of profileEndpoint.endpoints) {
        const findEndpoint = endpoints.find((e) => e.name === endpoint.name);

        if (profile && findEndpoint) {
          const currentProfileEndpoints =
            await this.profileEndpointService.getProfileEndpoints();
          const alreadyConnected = currentProfileEndpoints.some(
            (pe) =>
              pe.profileId === profile.id && pe.endpointId === findEndpoint.id,
          );

          if (!alreadyConnected) {
            await this.profileEndpointService.createProfileEndpoint(
              profile.id,
              findEndpoint.id,
            );
            console.log(
              `Connected profile "${profile.name}" to endpoint "${findEndpoint.name}"`,
            );
          }
        }
      }
    }
    console.log('Profile to endpoint connections completed.');
  }
}
