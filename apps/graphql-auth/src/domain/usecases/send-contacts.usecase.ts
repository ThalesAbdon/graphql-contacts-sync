import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '@graphql-auth/src/infra/amqp/services/rabbitmq.service';
import {
  ContactOutput,
  ContactsResponseOutput,
} from '../validators/dto/create-contacts.output.dto';
import { IUsecase } from '../interfaces/IUsecase.interface';
import { Contacts } from '../validators/dto/create-contacts.input.dto';

@Injectable()
export class SendContactsUsecase implements IUsecase<ContactsResponseOutput> {
  constructor(private readonly rabbitMQService: RabbitMQService) {}
  async execute(
    input: Contacts,
    routingKey: string,
  ): Promise<ContactsResponseOutput> {
    const valid: ContactOutput[] = [];
    const invalid: ContactOutput[] = [];
    input.contacts.forEach((contact) => {
      const regexDesk = /^55\d{2}3\d{7}$/;
      const regexCell = /^55\d{2}9\d{8}$/;
      if (
        regexDesk.test(contact.cellphone) ||
        regexCell.test(contact.cellphone)
      ) {
        valid.push({ ...contact });
      } else {
        invalid.push({ ...contact });
      }
    });

    if (valid.length > 0) {
      await this.rabbitMQService.send(routingKey, valid);
    }

    return {
      valid: valid,
      invalid: invalid,
    };
  }
}
