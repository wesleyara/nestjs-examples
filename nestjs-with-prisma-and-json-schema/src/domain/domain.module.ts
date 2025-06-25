import { Module } from '@nestjs/common';
import { AccountsModule } from './account/accounts.module';

@Module({
  imports: [AccountsModule],
})
export class DomainModule {}
