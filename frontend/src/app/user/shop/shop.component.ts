import {Component, Input} from '@angular/core';
import {CoinIncentiveService} from "../../shared/service/backend/coin-incentive.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {CurrencyIncentive} from "../../shared/model/currency-incentive";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {WalletService} from "../../shared/service/web3/wallet.service";
import {TransactionService} from "../../shared/service/backend/transaction.service";
import {Transaction} from "../../shared/model/transaction";
import {Balance} from "../../shared/model/balance";
import {TransferService} from "../../shared/service/web3/transfer.service";
import {environment} from "../../../environments/environment";
import {StatusDialog} from "../../shared/directives/status-dialog/status-dialog";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatButton,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    MatIcon,
    NgIf
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  incentives: CurrencyIncentive[] | undefined;
  @Input({required: true}) editVisible!: boolean;
  @Input({required: true}) buyVisible!: boolean;
  balances: Balance[] | undefined;

  constructor(private coinIncentiveService: CoinIncentiveService,
              private transferService: TransferService,
              private walletService: WalletService,
              private transactionService: TransactionService,
              private dialog: MatDialog) {
    this.getIncentives();
  }

  public getIncentives() {
    this.coinIncentiveService.getAvailableIncentives().subscribe((result: CurrencyIncentive[]) => {
      this.incentives = result;
    });
  }

  public buy(incentive: CurrencyIncentive) {
    // @ts-ignore
    this.transferService.transferCurrencyCoinToOwner(incentive.price).then((data) => {
      this.walletService.refreshAccounts();
      console.log(data);

      let transaction: Transaction = {
        id: data?.hash.toString(),
        // @ts-ignore
        senderAddress: this.walletService.getAccounts()[0].address,
        senderEmail: undefined,
        receiverAddress: environment.companyAddress,
        receiverEmail: undefined,
        info: "Bought '" + incentive.name + "' for " + incentive.price + " coin(s)",
        timestamp: formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en'),
        type: 'INCOMING',
        reason: 'Shop Transaction',
      }

      this.transactionService.createCurrencyTransaction(transaction).subscribe((transaction) => {
        const dialogRef = this.dialog.open(StatusDialog, {
          data: {successful: true, title: 'Success', message: 'Transaction successfull', duration: 2000},
          width: '500px'
        });
      });
    }).catch((error) => {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'Transaction failed: ' + error, duration: 5000},
        width: '500px'
      });
    });
  }

  public hasEnoughBalance(incentive: CurrencyIncentive) {
    if (this.balances !== undefined
      && incentive !== undefined
      && incentive.price !== undefined
      && this.balances !== undefined
      && this.balances[0] !== undefined) {
      // @ts-ignore
      return this.balances[0].amount >= incentive.price;
    } else {
      return false;
    }
  }
}


