import { Injectable } from "@angular/core";

@Injectable()
export class LoginValidation{
    public validate(email?: string, password?: string): Array<string>{
        const errors: Array<string> = new Array<string>();

        if(!email || !password){
            errors.push('Email e Senha são obrigatórios!');
        }

        if(!this.emailValidation(email)){
            errors.push('Email inválido!');
        }

        return errors;
    }

    private emailValidation(email: string = ''): boolean{
        const emailRegex: RegExp = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
        return emailRegex.test(email);
    }
}