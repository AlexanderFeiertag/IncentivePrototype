import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WalletService} from "../shared/service/web3/wallet.service";
import {Employee} from "../shared/model/employee";
import {NgForOf, NgIf} from "@angular/common";
import {ShopComponent} from "./shop/shop.component";
import {InstallationComponent} from "./installation/installation.component";
import {environment} from "../../environments/environment";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AddressDirectiveComponent} from "../shared/directives/address-directive/address-directive.component";
import {Balance} from "../shared/model/balance";
import {Subscription} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatDialog} from "@angular/material/dialog";
import {TransactionsComponent} from "./transactions/transactions.component";
import {MatButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {NftIncentiveService} from "../shared/service/backend/nft-incentive.service";
import {BalanceService} from "../shared/service/web3/balance.service";
import {RegistrationService} from "../shared/service/web3/registration.service";

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [
    NgIf,
    NgForOf,
    ShopComponent,
    InstallationComponent,
    MatTab,
    MatTabGroup,
    AddressDirectiveComponent,
    MatProgressSpinner,
    MatButton,
    MatIconModule,
    MatPaginator,
    MatCardModule,
  ],
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {

  isInstallationCompleted = false;
  account: Employee | undefined;
  public balances: Balance[] | undefined;
  protected readonly environment = environment;
  @ViewChild(ShopComponent) shopComponent!: ShopComponent;

  private accountSubscription: Subscription | undefined;

  constructor(private walletService: WalletService,
              private nftIncentiveService: NftIncentiveService,
              private balanceService: BalanceService,
              private registrationService: RegistrationService,
              private dialog: MatDialog) {
    if (!this.isInstallationCompleted) {
      walletService.refreshAccounts();
    }
  }

  ngOnDestroy(): void {
    this.accountSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.accountSubscription = this.walletService.accountObservable.asObservable().subscribe((result) => {
      console.log(result)
      if (result !== undefined && result.length > 0 && result[0].email !== undefined && result[0].email !== '') {
        this.account = result[0];
        this.isInstallationCompleted = true;

        this.balances = undefined;
        if (this.balances === undefined) {
          const finalResult: Balance[] = [];

          this.balanceService.getCurrencyCoinBalance(result[0].address).then((coinBalance) => {
            finalResult.push(coinBalance);
            this.balances = finalResult;

            if (this.shopComponent !== undefined && this.shopComponent.balances === undefined) {
              this.shopComponent.balances = this.balances;
            }

            this.nftIncentiveService.getAllIncentives().subscribe((incentives) => {
              this.balanceService.getNftBalance(result[0].address, incentives).then((nftBalances) => {
                // @ts-ignore
                finalResult.push(...nftBalances);
                this.balances = finalResult;
              });
            });
          });
        }
      }
    });
  }

  openTransactions() {
    const dialogRef = this.dialog.open(TransactionsComponent, {
      data: {},
      width: '1000px'
    });
  }

  importAllTokens(balance: Balance) {
    this.registrationService.addNFTToMetaMask(balance);
  }
}
