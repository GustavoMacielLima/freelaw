import { Injectable } from "@angular/core";
import { ContactModel } from "./contact.service";

@Injectable()
export class ContactValidation {
    public validate(contact: ContactModel): Array<string>{
        const errors: Array<string> = new Array<string>();

        if(!contact.name || !contact.surname){
            errors.push('Nome e Sobrenome são obrigatórios!');
        }

        if(!contact.email){
            errors.push('Email é obrigatório!');
        }

        if(!this.emailValidation(contact.email)){
            errors.push('Email inválido!');
        }
        
        if(!this.dateValidation(contact.birthday)){
            errors.push('Data de Nascimento inválido!');
        }

        return errors;
    }

    private emailValidation(email: string = ''): boolean{
        const emailRegex: RegExp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
        return emailRegex.test(email);
    }

    private dateValidation(date: string = ''): boolean{
        if(date.length < 8) return false;
        if(!(+date.slice(4,8) > 1900 && +date.slice(4,8) <= new Date().getFullYear())) return false;

        const newDate: string = date.slice(4,8) + '/' + date.slice(2,4) + '/' + date.slice(0,2);
        const dateFormat: Date = new Date(newDate);
        return !isNaN(dateFormat.valueOf());
    }
}