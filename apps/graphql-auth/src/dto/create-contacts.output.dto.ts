import { Field, ObjectType} from "@nestjs/graphql";

@ObjectType('ContactResponse')
export class ContactOutput{
    @Field()
    name: string;

    @Field()
    cellphone: string; 
}

@ObjectType('ContactsResponseOutput')
export class ContactsResponseOutput {
    @Field(() => [ContactOutput])
    valid: ContactOutput[]

    @Field(() => [ContactOutput])
    invalid: ContactOutput[];
}

