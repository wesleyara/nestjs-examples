import { Inject, Injectable } from '@nestjs/common';
import { AccountProfileRepository } from './account-profile.repository';

@Injectable()
export class AccountProfileService {
  @Inject(AccountProfileRepository)
  private accountProfileRepository: AccountProfileRepository;

  async createAccountProfile(accountId: string, profileId: string) {
    const accountProfile =
      await this.accountProfileRepository.createAccountProfile(
        accountId,
        profileId,
      );

    return accountProfile;
  }

  async getAccountProfiles() {
    const accountProfiles =
      await this.accountProfileRepository.getAccountProfiles();

    return accountProfiles;
  }
}
