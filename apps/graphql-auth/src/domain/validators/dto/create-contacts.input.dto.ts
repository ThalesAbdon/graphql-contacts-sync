import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ContactEntity } from '@graphql-auth/src/domain/entities/contacts';
import { IsArray } from 'class-validator';

@InputType()
@ObjectType('CreateContact')
export class SendContactInput extends ContactEntity {
  @Field()
  name: string;

  @Field()
  cellphone: string;

  @Field({ nullable: true, defaultValue: null })
  email: string;

  constructor(property: SendContactInput) {
    super(property);
  }
}

@InputType()
@ObjectType('Contacts')
export class Contacts {
  @Field(() => [SendContactInput])
  @IsArray()
  contacts: SendContactInput[];

  constructor(property: Contacts) {
    Object.assign(this, property);
  }
}
