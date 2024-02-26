import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ContactsEntity } from '../entities/contacts';
import { IsArray } from 'class-validator';

@InputType()
@ObjectType('CreateContact')
export class SendContactInput extends ContactsEntity {
  @Field()
  name: string;

  @Field()
  cellphone: string;

  @Field({ nullable: true, defaultValue: null })
  email?: string;
}

@InputType()
@ObjectType('Contacts')
export class Contacts {
  @Field(() => [SendContactInput])
  @IsArray()
  contacts: SendContactInput[];
}
