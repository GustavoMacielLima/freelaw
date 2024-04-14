import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../../shared/service/contact/contact.service';
import { LitigationService } from '../../../shared/service/litigation/litigation.service';

@Component({
  selector: 'freelaw-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public contactCount: number = 0;
  public litigationCount: number = 0;

  constructor(
    private contactService: ContactService,
    private litigationService: LitigationService
  ){
    this.getContactCount();
    this.getLitigationCount();
  }

  private getContactCount(): void{
    this.contactCount = this.contactService.getPagination();
  }

  private getLitigationCount(): void{
    this.litigationCount = this.litigationService.getPagination();
  }
}
