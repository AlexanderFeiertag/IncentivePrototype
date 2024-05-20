import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckbox} from "@angular/material/checkbox";
import {UtilsService} from "../../../shared/service/web3/utils.service";

export interface NftIncentiveDialogData {
  isCreate: true;
  symbol: string;
  name: string;
  address: string;
  icon: string;
}

@Component({
  selector: 'nft-incentive-dialog',
  templateUrl: 'nft-incentive-dialog.html',
  styleUrl: './nft-incentive-dialog.scss',
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
export class NftIncentiveDialog {

  constructor(public dialogRef: MatDialogRef<NftIncentiveDialog>,
              @Inject(MAT_DIALOG_DATA) public data: NftIncentiveDialogData,
              private utilsService: UtilsService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async loadDetails(address: string) {
    if (address !== undefined && address !== null && address !== '') {
      const name = await this.utilsService.getNftContractName(address);
      const symbol = await this.utilsService.getNftContractSymbol(address);

      this.data.name = name !== undefined ? name : '';
      this.data.symbol = symbol !== undefined ? symbol : '';
    }
  }
}
