import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginValidation } from '../../../shared/service/login/login.validation';

@Component({
  selector: 'freelaw-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email?: string;
  password?: string;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private loginValidation: LoginValidation,
  ){}

  login(): void{
    const validation: Array<string> = this.loginValidation.validate(this.email,this.password);
    if(validation.length) {
      this.snackBar.open(validation[0], undefined, {
        duration: 5000
      });
      return;
    }

    localStorage.setItem('user', JSON.stringify({
      email: this.email,
      password: this.password
    }));

    this.router.navigate(['/main']);
  }
}
