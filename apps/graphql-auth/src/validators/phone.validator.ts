import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class ValidPhone implements ValidatorConstraintInterface {
    validate(cellphone: string) {
        const regexDesk = /^55\d{2}3\d{7}$/
        const regexCell = /^55\d{2}9\d{8}$/
        return  regexDesk.test(cellphone) || regexCell.test(cellphone) ? true : false;
    }
  
    defaultMessage() {
      return 'O número de telefone deve ser válido.';
    }
  }