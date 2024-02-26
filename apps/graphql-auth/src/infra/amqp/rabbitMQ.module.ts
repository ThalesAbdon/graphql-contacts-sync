import { Module } from '@nestjs/common';
import { rabbitMQDependency } from './depedencie';
import { RabbitMQService } from './services/rabbitmq.service';

@Module({
  imports: [...rabbitMQDependency],
  exports: [...rabbitMQDependency],
  providers: [RabbitMQService],
})
export class RabbitmqModule {}
