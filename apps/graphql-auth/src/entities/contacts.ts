import {
    Field, ObjectType,
  } from '@nestjs/graphql';
import { IContact } from '../interfaces/IContact.interface';

  @ObjectType()
  export class ContactEntity implements IContact {
    @Field()
    name: string;
  
    @Field()
    cellphone: string;
  }

  export class ContactsEntity {
    @Field(() => [ContactEntity])
    contacts: ContactEntity[]
  }