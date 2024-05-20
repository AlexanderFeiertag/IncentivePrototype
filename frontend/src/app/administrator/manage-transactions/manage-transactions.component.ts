import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {TransactionService} from "../../shared/service/backend/transaction.service";
import {AddressDirectiveComponent} from "../../shared/directives/address-directive/address-directive.component";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {Transaction} from "../../shared/model/transaction";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {StatusDialog} from "../../shared/directives/status-dialog/status-dialog";

@Component({
  selector: 'app-manage-transactions',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatPaginator,
    MatSortModule,
    MatCheckbox,
    AddressDirectiveComponent,
    FormsModule,
    MatProgressSpinner,
    NgForOf,
    NgIf
  ],
  templateUrl: './manage-transactions.component.html',
  styleUrl: './manage-transactions.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageTransactionsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['sender', 'receiver', 'info', 'timestamp', 'type', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  filterText: any;
  expandedElement: Transaction | null | undefined;
  protected readonly environment = environment;

  constructor(private transactionService: TransactionService,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
    this.initOrReloadTransactions();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['email']);
      this.dataSource.filter = params['email'];
      // @ts-ignore
      this.filterText = params['email'];
    });
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private initOrReloadTransactions() {
    try {
      this.transactionService.getTransactions().subscribe((data) => {
        this.dataSource.data = data;
      });
    } catch (e) {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'Failed to load Transactions: ' + e, duration: 2000},
        width: '500px'
      });
    }
  }
}
