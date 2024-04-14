import { Injectable } from "@angular/core";
import { LitigationModel, SocialNumberType } from "./litigation.service";

@Injectable()
export class LitigationValidation{
    public validate(litigation: LitigationModel): Array<string>{
        const errors: Array<string> = new Array<string>();

        if(!litigation.partName){
            errors.push('Nome da Parte é obrigatório!');
        }

        if(!litigation.litigationNumber){
            errors.push('Número do Processo é obrigatório!');
        }

        if(!litigation.partSocialNumber || !litigation.partSocialNumberType){
            errors.push('Tipo do Documento e Número do Documento são obrigatórios!');
        }

        if(litigation.partSocialNumberType === SocialNumberType.CPF && !this.cpfValidation(litigation.partSocialNumber)){
            errors.push('CPF está inválido!');
        }

        if(litigation.partSocialNumberType === SocialNumberType.CNPJ && !this.cnpjValidation(litigation.partSocialNumber)){
            errors.push('CNPJ está inválido!');
        }

        return errors;
    }

    private cpfValidation(socialNumber: string = ''): boolean{
        if(socialNumber.length < 11) return false;

        let sum: number = 0;
        let calc: number = 0;

        if(socialNumber == '00000000000') return false;
        for(let i=1; i<=9; i++) sum = sum + parseInt(socialNumber.substring(i-1, i)) * (11 - i);
        calc = (sum * 10) % 11;

        if((calc == 10) || (calc == 11)) calc = 0;
        if(calc != parseInt(socialNumber.substring(9, 10))) return false;

        sum = 0;
        for(let i = 1; i <= 10; i++) sum = sum + parseInt(socialNumber.substring(i-1, i))*(12-i);
        calc = (sum * 10) % 11;

        if((calc == 10) || (calc == 11)) calc = 0;
        if(calc != parseInt(socialNumber.substring(10, 11))) return false;
        return true;
    }

    private cnpjValidation(socialNumber: string = ''): boolean{
        const digitsOnly = /^\d{14}$/.test(socialNumber)
        return socialNumber.length === 14 && digitsOnly;
    }
}