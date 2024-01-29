import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../entities/contact.entities';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(ContactEntity) private contactRepository: Repository<ContactEntity>,
    ) { }

    create(contact: Partial<ContactEntity>) {
        const newContact = this.contactRepository.create({ ...contact});
        return this.contactRepository.save(newContact);
    }

    findOne(cellphone: string) {
        return this.contactRepository.findOne({where:{cellphone}})
    }
}