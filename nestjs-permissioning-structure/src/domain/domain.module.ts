import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { EndpointsModule } from './endpoints/endpoints.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AccountProfileModule } from './account-profile/account-profile.module';
import { ClientsModule } from './clients/clients.module';
import { ProfileEndpointModule } from './profile-endpoint/profile-endpoint.module';

@Module({
  imports: [
    AccountsModule,
    EndpointsModule,
    ProfilesModule,
    AccountProfileModule,
    ClientsModule,
    ProfileEndpointModule,
  ],
})
export class DomainModule {}
