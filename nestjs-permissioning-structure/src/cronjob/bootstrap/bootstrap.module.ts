import { Module } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { BootstrapCreateUseCase } from './use-cases/bootstrap-create.use-case';
import { EndpointsModule } from 'src/domain/endpoints/endpoints.module';
import { ProfilesModule } from 'src/domain/profiles/profiles.module';
import { AccountsModule } from 'src/domain/accounts/accounts.module';
import { BootstrapConnectUseCase } from './use-cases/bootstrap-connect.use-case';
import { AccountProfileModule } from 'src/domain/account-profile/account-profile.module';
import { ProfileEndpointModule } from 'src/domain/profile-endpoint/profile-endpoint.module';

@Module({
  imports: [
    EndpointsModule,
    ProfilesModule,
    AccountsModule,
    AccountProfileModule,
    ProfileEndpointModule,
  ],
  providers: [
    BootstrapService,
    BootstrapCreateUseCase,
    BootstrapConnectUseCase,
  ],
})
export class BootstrapModule {}
