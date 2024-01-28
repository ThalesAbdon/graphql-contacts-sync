import { Injectable } from "@nestjs/common";
import { Contacts } from "../dto/create-contacts.input.dto";
import { IUsecase } from "../interfaces/IUsecase.interface";
import { ContactOutput, ContactsResponseOutput } from "dto/create-contacts.output.dto";

@Injectable()
export class SendContactsUsecase implements IUsecase<Contacts,ContactsResponseOutput>{
    constructor (){}
    async execute (input: Contacts): Promise<ContactsResponseOutput>{
        
        const valid: ContactOutput[]= []
        const invalid: ContactOutput[] = []
        input.contacts.forEach(contact => {
            const regexDesk = /^55\d{2}3\d{7}$/
            const regexCell = /^55\d{2}9\d{8}$/
            if (regexDesk.test(contact.cellphone) || regexCell.test(contact.cellphone)){
                valid.push({...contact})   
            }else{
                invalid.push({...contact})
            }
        })
    
        return {
            valid: valid,
            invalid: invalid
        }
      } 
}
