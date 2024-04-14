import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'freelaw-test';

  constructor(private router: Router){}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if(!user){
      this.router.navigate(['login']);
    }
  }
}
