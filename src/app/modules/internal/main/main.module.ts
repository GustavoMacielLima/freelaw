import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../../../shared/component/components/header/header.component';
import { DashboardCardComponent } from '../../../shared/component/components/dashboard-card/dashboard-card.component';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    HeaderComponent,
    DashboardCardComponent
  ]
})
export class MainModule { }
