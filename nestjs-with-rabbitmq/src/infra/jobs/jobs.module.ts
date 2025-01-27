import { Module } from '@nestjs/common';
import { JobsConsumer } from './jobs.consumer';

@Module({
  providers: [JobsConsumer],
})
export class JobsModule {}
