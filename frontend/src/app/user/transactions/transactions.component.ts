import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TransactionService} from "../../shared/service/backend/transaction.service";
import {environment} from "../../../environments/environment";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AddressDirectiveComponent} from "../../shared/directives/address-directive/address-directive.component";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Transaction} from "../../shared/model/transaction";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {WalletService} from "../../shared/service/web3/wallet.service";

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  imports: [
    AddressDirectiveComponent,
    MatTableModule,
    MatPaginator,
    MatDialogTitle,
    MatDialogContent,
    MatIcon,
    MatIconButton,
  ],
  styleUrl: './transactions.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionsComponent implements AfterViewInit {

  displayedColumns: string[] = ['sender', 'receiver', 'info', 'timestamp', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  expandedElement: Transaction | null | undefined;
  protected readonly environment = environment;

  constructor(private transactionService: TransactionService, private walletService: WalletService) {
    // @ts-ignore
    const address = this.walletService.getAccounts()[0].address;

    this.transactionService.getTransactionByUser(address).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }
}
