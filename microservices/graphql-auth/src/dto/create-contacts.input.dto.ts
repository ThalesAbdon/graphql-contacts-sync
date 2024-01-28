import { Field, InputType, ObjectType, Scalar } from "@nestjs/graphql";
import { ContactsEntity } from "../entities/contacts";
import { IsArray, IsString, Matches, Validate } from "class-validator";

@InputType()
@ObjectType('CreateContact')
export class SendContactInput extends ContactsEntity{
    @Field()
    @IsString()
    name: string;
  
    @Field()
    @IsString()
    cellphone: string; 
}

@InputType()
@ObjectType('Contacts')
export class Contacts{
    @Field(() => [SendContactInput])
    @IsArray()
    contacts: SendContactInput[];
}
