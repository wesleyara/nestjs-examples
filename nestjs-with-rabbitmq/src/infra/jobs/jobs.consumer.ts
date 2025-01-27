import {
  AmqpConnection,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { delay } from 'essentials-utils';

@Injectable()
export class JobsConsumer {
  constructor(private amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'example',
    queue: 'example_queue',
  })
  async consumer(msg: { message: string; repeat: number }) {
    try {
      console.log('start example queue consumer');
      const ms = 5000;
      await delay(ms);

      console.log('message', msg);

      if (msg.repeat >= 0) {
        await this.amqpConnection.publish('amq.direct', 'example', {
          message: 'Hello World',
          repeat: msg.repeat - 1,
        });
      }

      return new Nack(false);
    } catch (error) {
      console.error('error', error);
      return new Nack(true);
    }
  }
}
