import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  constructor(private amqpConnection: AmqpConnection) {}

  @Get()
  async getHello() {
    await this.amqpConnection.publish('amq.direct', 'example', {
      message: 'Hello World',
      repeat: 5,
    });

    return 'Success';
  }
}
