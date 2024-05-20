import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckbox} from "@angular/material/checkbox";

export interface CurrencyIncentiveDialogData {
  isCreate: true;
  name: string;
  description: string;
  icon: string;
  price: number;
  available: boolean;
}

@Component({
  selector: 'currency-incentive-dialog',
  templateUrl: 'currency-incentive-dialog.html',
  styleUrl: './currency-incentive-dialog.scss',
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
    MatCheckbox,
  ],
})
export class CurrencyIncentiveDialog {

  constructor(public dialogRef: MatDialogRef<CurrencyIncentiveDialog>, @Inject(MAT_DIALOG_DATA) public data: CurrencyIncentiveDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
