import { Field, ObjectType } from '@nestjs/graphql';
import { IContact } from '../interfaces/IContact.interface';

@ObjectType()
export class ContactEntity implements IContact {
  @Field()
  name: string;

  @Field()
  cellphone: string;

  @Field()
  email: string;

  constructor(property: ContactEntity) {
    Object.assign(this, property);
  }
}

export const returnField = () => ContactEntity;
export class ContactsEntity {
  @Field(returnField)
  contacts: ContactEntity[];

  constructor(property: ContactsEntity) {
    Object.assign(this, property);
  }
}
