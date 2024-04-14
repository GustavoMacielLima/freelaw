import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective } from 'ngx-mask';
import { DialogHeaderComponent } from '../../../../../shared/component/components/dialog-header/dialog-header.component';
import { CustomInputComponent } from '../../../../../shared/component/components/custom-input/custom-input.component';
import { LitigationModel, LitigationService, SocialNumberType } from '../../../../../shared/service/litigation/litigation.service';
import { LitigationValidation } from '../../../../../shared/service/litigation/litigation.validation';

@Component({
  selector: 'freelaw-litigation-form-modal',
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
    MatRadioModule,
    DialogHeaderComponent,
    CustomInputComponent
  ],
  providers: [LitigationService, LitigationValidation],
  templateUrl: './litigation-form-modal.component.html',
  styleUrl: './litigation-form-modal.component.scss'
})
export class LitigationFormModalComponent {
  public litigation: LitigationModel = new LitigationModel();
  public title: string = '';
  public socialNumberTypes = SocialNumberType;
  public selectedSocialNumberType = 'CPF';

  constructor(
    public dialogRef: MatDialogRef<LitigationFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LitigationModel,
    private snackBar: MatSnackBar,
    private litigationService: LitigationService,
    private litigationValidation: LitigationValidation
  ) {
    this.title = (data ? 'Editar' : 'Novo') + ' processo';
    this.litigation = data ?? new LitigationModel();
  }

  save(): void {
    let message: string = 'Processo alterado com sucesso!';
    this.litigation.partSocialNumberType = this.selectedSocialNumberType;
    const validation: Array<string> = this.litigationValidation.validate(this.litigation);
    
    if(validation.length){
      this.snackBar.open(validation[0], undefined,{
        duration: 5000
      })
      return;
    }

    if (this.litigation?.id){
      this.litigationService.update(this.litigation);
    } else {
      this.litigationService.create(this.litigation);
      message = 'Processo criado com sucesso!';
    } 
    this.snackBar.open(message, undefined, {
      duration: 5000
    });
    this.dialogRef.close(this.litigation);
  }

  close(): void {
    this.dialogRef.close();
  }
}
