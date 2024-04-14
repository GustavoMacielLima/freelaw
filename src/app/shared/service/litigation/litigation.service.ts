import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LitigationService {

  constructor() { }

  get(page?: number, rows?: number, searchText?: string): Array<LitigationModel>{
    const litigationsString: string|null = localStorage.getItem('litigations');
    
    if(!litigationsString){
      return new Array<LitigationModel>();
    }

    let litigations: Array<LitigationModel> = JSON.parse(litigationsString);
    of(litigations)
    .pipe(map((litigationsFilter: Array<LitigationModel>) => {
        litigationsFilter = litigationsFilter.filter( (litigation: LitigationModel) => {
          return searchText ? (
            (litigation.litigationNumber && litigation.litigationNumber.indexOf(searchText) > -1) ||
            (litigation.partSocialNumber && litigation.partSocialNumber.indexOf(searchText) > -1)
          ) : true
        })
        
        return page && rows ? litigationsFilter.slice((page - 1) * rows, page * rows) : litigationsFilter;
      })
    ).subscribe({
      next: (litigationsFiltered: Array<LitigationModel>) => litigations = litigationsFiltered
    });

    return litigations;
  }

  getPagination(searchText?: string): number{
    return this.get(undefined, undefined, searchText).length
  }

  create(litigation: LitigationModel): void{
    const newId: string = new Date().valueOf().toString();
    litigation.id = newId;
    const constacts: Array<LitigationModel> = this.get();
    constacts.push(litigation);
    localStorage.setItem('litigations', JSON.stringify(constacts));
  }

  update(updatedLitigation: LitigationModel): void{
    const constacts: Array<LitigationModel> = this.get();
    
    constacts.forEach((litigation: LitigationModel) => {
      if (litigation.id === updatedLitigation.id) {
        Object.assign(litigation, updatedLitigation);
      }
    });

    localStorage.setItem('litigations', JSON.stringify(constacts));
  }

  delete(deleteLitigation: LitigationModel): void{
    const constacts: Array<LitigationModel> = this.get().filter((litigation: LitigationModel) => {
      return litigation.id !== deleteLitigation.id;
    });

    localStorage.setItem('litigations', JSON.stringify(constacts));
  }
}

//Campos escolhidos com base na página de consulta do PJE do TJMG
export class LitigationModel {
  id?: string;
  litigationNumber?: string;
  partName?: string;
  socialPartName?: string;
  partSocialNumberType?: string;
  partSocialNumber?: string;
  lawer?: string;
}

export enum SocialNumberType{
  CPF = 'CPF',
  CNPJ = 'CNPJ'
}