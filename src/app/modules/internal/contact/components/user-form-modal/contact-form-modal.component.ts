import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ContactModel, ContactService } from '../../../../../shared/service/contact/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { DialogHeaderComponent } from '../../../../../shared/component/components/dialog-header/dialog-header.component';
import { CustomInputComponent } from '../../../../../shared/component/components/custom-input/custom-input.component';
import { ContactValidation } from '../../../../../shared/service/contact/contact.validation';


@Component({
  selector: 'freelaw-user-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    DialogHeaderComponent,
    CustomInputComponent
  ],
  providers: [
    ContactService,
    ContactValidation,
    provideNgxMask()
  ],
  templateUrl: './contact-form-modal.component.html',
  styleUrl: './contact-form-modal.component.scss'
})
export class ContactFormModalComponent {
  public contact: ContactModel = new ContactModel();
  public title: string = '';

  constructor(
    public dialogRef: MatDialogRef<ContactFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactModel,
    private contactService: ContactService,
    private contactValidation: ContactValidation,
    private snackBar: MatSnackBar
  ) {
    this.title = (data ? 'Editar' : 'Novo') + ' usuário';
    this.contact = data ?? new ContactModel();
  }

  save(): void {
    let message: string = 'Usuário alterado com sucesso!';
    const validation: Array<string> = this.contactValidation.validate(this.contact);
    
    if(validation.length){
      this.snackBar.open(validation[0], undefined,{
        duration: 5000
      })
      return;
    }

    if (this.contact?.id){
      this.contactService.update(this.contact);
    } else {
      this.contactService.create(this.contact);
      message = 'Usuário criado com sucesso!';
    }
    this.snackBar.open(message, undefined, {
      duration: 5000
    });
    this.dialogRef.close(this.contact);
  }

  close(): void {
    this.dialogRef.close();
  }
}
