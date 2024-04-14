import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'freelaw-page-title',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() pageName: string = '';
  @Input() previousPage: string = '';

  constructor(private router: Router){}
  
  public goTo(): void{
    this.router.navigate([this.previousPage]);
  }
}
