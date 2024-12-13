import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    console.log('Called when the application is ready to go!');
  }
}
