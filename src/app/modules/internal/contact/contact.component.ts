import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactFormModalComponent } from './components/user-form-modal/contact-form-modal.component';
import { ContactModel, ContactService } from '../../../shared/service/contact/contact.service';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Subscription, debounceTime, fromEvent, of } from 'rxjs';

@Component({
  selector: 'freelaw-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public contacts: Array<ContactModel> = new Array<ContactModel>();
  public displayedColumns: Array<string> = ['name', 'email', 'phone', 'birthday', 'tools'];
  public length: number = 10;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public pageSizeOptions: Array<number> = [5, 10, 25];
  public searchText: string = '';
  public searchTextChange: Subject<string> = new Subject<string>();
  public searchControl: Subscription = new Subscription();

  public pageEvent: PageEvent = new PageEvent();

  constructor(public dialog: MatDialog, private contactService: ContactService){
    this.getContacts();
  }

  search(ev: unknown): void {
    const newSearch: string = typeof ev === 'string' ? ev.toString() : '';
    this.searchTextChange.next(newSearch);
    this.searchControl = this.searchTextChange.pipe(debounceTime(1000)).subscribe((searchValue: string) => {
      this.searchText = searchValue;
      this.getContacts();
    });
  }

  private getContacts(): void {
    this.getContactsRowsLength();
    this.contacts = this.contactService.get(this.pageIndex + 1, this.pageSize, this.searchText);
  }

  private getContactsRowsLength(): void {
    this.length = this.contactService.getPagination(this.searchText);
  }

  public openContactModal(contact?: ContactModel): void{
    const createDialog = this.dialog.open(ContactFormModalComponent, {
      data: contact
    });

    createDialog.afterClosed().subscribe(data => {
      if(!data) return;
      this.getContacts();
    });
  }
  
  public delete(contact: ContactModel): void{
    const deleteConfirm: boolean = confirm('Deseja excluir esse registro?');
    if (!deleteConfirm) return;
    this.contactService.delete(contact);
    this.getContacts();
  }

  public handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageSize !== this.pageSize ? 0 : e.pageIndex;
    this.pageSize = e.pageSize;
    this.getContacts();
  }

}
