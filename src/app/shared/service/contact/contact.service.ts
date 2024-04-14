import { Injectable } from '@angular/core';
import { filter, from, map, of } from 'rxjs';

@Injectable()
export class ContactService {

  constructor() { }

  get(page?: number, rows?: number, searchText?: string): Array<ContactModel>{
    const contactsString: string|null = localStorage.getItem('contacts');
    
    if(!contactsString){
      return new Array<ContactModel>();
    }

    let contacts: Array<ContactModel> = JSON.parse(contactsString);
    of(contacts)
    .pipe(map((contactsFilter: Array<ContactModel>) => {
        contactsFilter = contactsFilter.filter( (contact: ContactModel) => {
          return searchText ? (
            (contact.email && contact.email.indexOf(searchText) > -1) ||
            (contact.name + ' ' + contact.surname).indexOf(searchText) > -1
          ) : true
        })
        
        return page && rows ? contactsFilter.slice((page - 1) * rows, page * rows) : contactsFilter;
      })
    ).subscribe({
      next: (contactsFiltered: Array<ContactModel>) => contacts = contactsFiltered
    });

    return contacts;
  }

  getPagination(searchText?: string): number{
    return this.get(undefined, undefined, searchText).length
  }

  create(contact: ContactModel): void{
    const newId: string = new Date().valueOf().toString();
    contact.id = newId;
    const constacts: Array<ContactModel> = this.get();
    constacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(constacts));
  }

  update(updatedContact: ContactModel): void{
    const constacts: Array<ContactModel> = this.get();
    
    constacts.forEach((contact: ContactModel) => {
      if (contact.id === updatedContact.id) {
        Object.assign(contact, updatedContact);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(constacts));
  }

  delete(deleteContact: ContactModel): void{
    const constacts: Array<ContactModel> = this.get().filter((contact: ContactModel) => {
      return contact.id !== deleteContact.id;
    });

    localStorage.setItem('contacts', JSON.stringify(constacts));
  }
}

export class ContactModel {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  birthday?: string;
}