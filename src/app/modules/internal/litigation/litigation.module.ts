import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LitigationComponent } from './litigation.component';
import { HeaderComponent } from '../../../shared/component/components/header/header.component';
import { PageTitleComponent } from '../../../shared/component/components/page-title/page-title.component';
import { RowsNotFoundComponent } from '../../../shared/component/components/rows-not-found/rows-not-found.component';
import { LitigationService } from '../../../shared/service/litigation/litigation.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CustomInputComponent } from '../../../shared/component/components/custom-input/custom-input.component';



@NgModule({
  declarations: [LitigationComponent],
  imports: [
    CommonModule,
    HeaderComponent,
    PageTitleComponent,
    RowsNotFoundComponent,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CustomInputComponent
  ],
  providers: [LitigationService]
})
export class LitigationModule { }
