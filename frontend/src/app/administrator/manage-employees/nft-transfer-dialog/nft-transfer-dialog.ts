import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NftIncentiveService} from "../../../shared/service/backend/nft-incentive.service";
import {NftIncentive} from "../../../shared/model/nft-incentive";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {UtilsService} from "../../../shared/service/web3/utils.service";

export interface NftTransferDialogData {
  receiverEmail: string;
  receiverAddress: string;
  tokenAddress: string;
  tokenName: string;
  reason: string;
}

@Component({
  selector: 'nft-transfer-dialog',
  templateUrl: 'nft-transfer-dialog.html',
  styleUrl: './nft-transfer-dialog.scss',
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
    MatOption,
    MatSelect,
  ],
})
export class NftTransferDialog implements OnInit {

  @ViewChild(MatSelect) select!: MatSelect;
  nftIncentives: NftIncentive[] = [];

  constructor(public dialogRef: MatDialogRef<NftTransferDialog>,
              @Inject(MAT_DIALOG_DATA) public data: NftTransferDialogData,
              private nftIncentiveService: NftIncentiveService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.nftIncentiveService.getAllIncentives().subscribe(async (data) => {
      const result = data;

      for (let i = 0; i < result.length; i++) {
        const name = await this.utilsService.getNftContractName(result[i].address);
        const symbol = await this.utilsService.getNftContractSymbol(result[i].address);

        result[i].name = name !== undefined ? name : '';
        result[i].symbol = symbol !== undefined ? symbol : '';

        this.nftIncentives.push(result[i]);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTokenName(tokenAddress: string) {
    this.data.tokenName = this.nftIncentives.find(incentive => incentive.address === tokenAddress)?.name || '';
  }
}
