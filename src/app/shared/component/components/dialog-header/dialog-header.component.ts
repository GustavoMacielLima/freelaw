import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'freelaw-dialog-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {
  @Input() title: string = '';
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  public close(): void{
    this.closeDialog.emit();
  }
}
