import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) {}  
    public async send(pattern: string, data: any) {
    return this.amqpConnection.publish(process.env.EXCHANGE,pattern,data);
  }
}