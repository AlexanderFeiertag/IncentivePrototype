import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface CurrencyTransferDialogData {
  email: string;
  address: string;
  tokenAmount: number;
  reason: string;
}

@Component({
  selector: 'currency-transfer-dialog',
  templateUrl: 'currency-transfer-dialog.html',
  styleUrl: './currency-transfer-dialog.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class CurrencyTransferDialog {
  constructor(public dialogRef: MatDialogRef<CurrencyTransferDialog>, @Inject(MAT_DIALOG_DATA) public data: CurrencyTransferDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
