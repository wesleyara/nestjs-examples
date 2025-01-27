import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';

const rabbitMQUrl = process.env.CLOUDAMQP_URL ?? 'amqp://localhost:5672';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: rabbitMQUrl,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqModule {}
