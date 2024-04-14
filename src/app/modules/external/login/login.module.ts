import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginValidation } from '../../../shared/service/login/login.validation';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [LoginValidation]
})
export class LoginModule { }
