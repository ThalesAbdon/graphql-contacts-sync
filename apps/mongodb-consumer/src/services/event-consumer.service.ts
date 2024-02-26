import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { ContactsService } from './contacts.service';
import { IMessage } from '../interfaces/IMessage.interface';

@Injectable()
export class EventConsumerService {
  constructor(private readonly contactService: ContactsService) {}

  @RabbitRPC({
    exchange: process.env.EXCHANGE,
    routingKey: process.env.ROUTE_MONGO,
    queue: process.env.QUEUE,
  })
  async saveContacts(messages: IMessage[]): Promise<void> {
    for (const message of messages) {
      const contactExist = await this.contactService.findOne(message.cellphone);
      if (!contactExist) await this.contactService.create(message);
    }
  }
}
