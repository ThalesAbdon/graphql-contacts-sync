import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject(AmqpConnection)
    private readonly amqpConnection: AmqpConnection,
  ) {}
  public async send(pattern: string, data: any) {
    return this.amqpConnection.publish(process.env.EXCHANGE, pattern, data);
  }
}
