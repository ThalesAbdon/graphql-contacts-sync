import { Field, ObjectType} from "@nestjs/graphql";

@ObjectType('ContactResponse')
export class ContactOutput{
    @Field()
    name: string;

    @Field()
    cellphone: string; 

    @Field({nullable: true, defaultValue: null})
    email?: string;
}


@ObjectType('ContactsResponseOutput')
export class ContactsResponseOutput {
    @Field(() => [ContactOutput])
    valid: ContactOutput[]

    @Field(() => [ContactOutput])
    invalid: ContactOutput[];
}

