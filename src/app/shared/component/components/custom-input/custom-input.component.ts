import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'freelaw-custom-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent {
  public inputValue: unknown;
  @Input() name: string = '';
  @Input() hideName: boolean = false;
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() required: boolean = false;
  
  @Output() valueChange: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Input() get value() {
    return this.inputValue;
  }

  set value(newValue){
    this.inputValue = newValue;
    this.valueChange.emit(this.inputValue);
  }
}
