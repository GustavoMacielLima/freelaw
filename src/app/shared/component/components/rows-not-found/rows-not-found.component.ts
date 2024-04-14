import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'freelaw-rows-not-found',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './rows-not-found.component.html',
  styleUrl: './rows-not-found.component.scss'
})
export class RowsNotFoundComponent {
  @Input() message: string = '';
  @Input() buttonName: string = '';
  @Output() createRow: EventEmitter<void> = new EventEmitter<void>();

  public create(): void{
    this.createRow.emit();
  }
}
