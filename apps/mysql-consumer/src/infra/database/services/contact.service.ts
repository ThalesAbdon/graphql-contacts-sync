import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from '@mysql-consumer/src/domain/contact/entities/contact.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Pick<
      Repository<ContactEntity>,
      'save' | 'findOne' | 'create'
    >,
  ) {}

  create(contact: Partial<ContactEntity>) {
    const newContact = this.contactRepository.create({ ...contact });
    return this.contactRepository.save(newContact);
  }

  findOne(cellphone: string) {
    return this.contactRepository.findOne({ where: { cellphone } });
  }
}
