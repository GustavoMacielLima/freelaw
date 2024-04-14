import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'freelaw-dashboard-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() counter: number = 0;
  @Input() route: string = '';
  @Input() buttonMessage: string = '';

  constructor(private router: Router){}

  public goTo(){
    this.router.navigate([this.route]);
  }
}
