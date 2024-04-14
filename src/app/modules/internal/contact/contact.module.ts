import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ContactService } from '../../../shared/service/contact/contact.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/component/components/header/header.component';
import { PageTitleComponent } from '../../../shared/component/components/page-title/page-title.component';
import { RowsNotFoundComponent } from '../../../shared/component/components/rows-not-found/rows-not-found.component';
import { CustomInputComponent } from '../../../shared/component/components/custom-input/custom-input.component';



@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    HeaderComponent,
    PageTitleComponent,
    RowsNotFoundComponent,
    CustomInputComponent
  ],
  providers: [
    ContactService,
    provideNgxMask()
  ]
})
export class UserModule { }
