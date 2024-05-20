import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {EmployeeService} from "../../shared/service/backend/employee.service";
import {MatDialog} from "@angular/material/dialog";
import {CurrencyTransferDialog} from "./curreny-transfer-dialog/currency-transfer-dialog";
import {EmployeeDialog} from "./employee-dialog/employee-dialog";
import {Employee} from "../../shared/model/employee";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AddressDirectiveComponent} from "../../shared/directives/address-directive/address-directive.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {NftTransferDialog} from "./nft-transfer-dialog/nft-transfer-dialog";
import {AuthService} from "../../shared/service/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Balance} from "../../shared/model/balance";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {formatDate, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router} from "@angular/router";
import {EmployeeStorageService} from "../../shared/service/web3/employee-storage.service";
import {TransferService} from "../../shared/service/web3/transfer.service";
import {BalanceService} from "../../shared/service/web3/balance.service";
import {NftIncentiveService} from "../../shared/service/backend/nft-incentive.service";
import {MatMenuModule} from "@angular/material/menu";
import {TransactionService} from "../../shared/service/backend/transaction.service";
import {Transaction} from "../../shared/model/transaction";
import {StatusDialog} from "../../shared/directives/status-dialog/status-dialog";

@Component({
  selector: 'app-manage-employees',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButton,
    MatIconButton,
    MatIcon, MatPaginator, MatSortModule, AddressDirectiveComponent, MatCheckbox, MatProgressSpinner, NgIf, NgForOf, NgStyle, NgClass, MatMenuModule],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageEmployeesComponent implements AfterViewInit {

  displayedColumns: string[] = ['email', 'address', 'manager', 'isAdministrator', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  expandedElement: Employee | null | undefined;
  expandedElementBalance: Balance[] | undefined;
  protected readonly environment = environment;

  constructor(private employeeService: EmployeeService,
              private authService: AuthService,
              private employeeStorageService: EmployeeStorageService,
              private transferService: TransferService,
              private transactionService: TransactionService,
              private balanceService: BalanceService,
              private nftIncentiveService: NftIncentiveService,
              private router: Router,
              public dialog: MatDialog) {
    this.initOrReloadEmployees();
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openNftTransferDialog(email: any, address: any) {
    const dialogRef = this.dialog.open(NftTransferDialog, {
      data: {receiverEmail: email, receiverAddress: address, reason: ''},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);

      if (result !== undefined && result.receiverAddress !== undefined && result.tokenAddress !== undefined && result.reason !== undefined) {
        this.transferService.transferNftIncentives(result.receiverAddress, result.tokenAddress).then((data) => {
          this.initOrReloadEmployees();

          let transaction: Transaction = {
            id: data?.hash.toString(),
            senderAddress: environment.companyAddress,
            senderEmail: undefined,
            receiverAddress: result.receiverAddress,
            receiverEmail: undefined,
            info: "Transferred 1 x '" + result.tokenName + "'",
            timestamp: formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en'),
            type: 'OUTGOING',
            reason: result.reason,
          }

          this.transactionService.createCurrencyTransaction(transaction).subscribe((transaction) => {
            const dialogRef = this.dialog.open(StatusDialog, {
              data: {successful: true, title: 'Success', message: 'Transferring NFT-Incentive was successful', duration: 2000},
              width: '500px'
            });
          });
        }).catch((error) => {
          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: false, title: 'Error', message: 'Transferring NFT-Incentive failed: ' + error, duration: 2000},
            width: '500px'
          });
        });
      }
    });
  }

  public openCurrencyTransferDialog(email: string, address: any) {
    const dialogRef = this.dialog.open(CurrencyTransferDialog, {
      data: {email: email, address: address, tokenAmount: 0, reason: ''},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);
      if (result !== undefined && result.tokenAmount !== undefined && result.tokenAmount > 0 && result.reason !== undefined) {
        this.transferService.transferCurrencyCoinToEmployee(result.address, result.tokenAmount).then((data) => {
          this.initOrReloadEmployees();

          let transaction: Transaction = {
            id: data?.hash.toString(),
            senderAddress: environment.companyAddress,
            senderEmail: undefined,
            receiverAddress: result.address,
            receiverEmail: undefined,
            info: 'Transferred ' + result.tokenAmount + ' x coin(s)',
            timestamp: formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en'),
            type: 'OUTGOING',
            reason: result.reason,
          }

          this.transactionService.createCurrencyTransaction(transaction).subscribe((transaction) => {
            const dialogRef = this.dialog.open(StatusDialog, {
              data: {successful: true, title: 'Success', message: 'Transferring Currency-Coin was successful', duration: 2000},
              width: '500px'
            });
          });
        }).catch((error) => {
          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: false, title: 'Error', message: 'Transferring Currency-Coin failed: ' + error, duration: 2000},
            width: '500px'
          });
        });
      }
    });
  }

  public createEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      data: {title: "Create Employee", email: "", address: ""},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);

      if (result !== undefined && result.email !== undefined && result.address !== undefined) {
        console.log(result);

        let employee: Employee = {
          email: result.email,
          address: result.address,
          manager: result.manager,
          administrator: undefined,
          balance: undefined,
          clean: undefined
        };

        try {
          this.employeeService.createEmployee(employee).subscribe((data) => {
            this.employeeStorageService.addEmployee(result.address, result.administrator, result.manager).then(() => {
              this.initOrReloadEmployees();

              const dialogRef = this.dialog.open(StatusDialog, {
                data: {successful: true, title: 'Success', message: 'Creating Employee was successful', duration: 2000},
                width: '500px'
              });
            });
          });
        } catch (error) {
          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: false, title: 'Error', message: 'Creating Employee failed: ' + error, duration: 2000},
            width: '500px'
          });
        }
      }
    });
  }

  public editEmployeeDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      data: {title: "Edit Employee", email: employee.email, address: employee.address, manager: employee.manager, administrator: employee.administrator},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);

      if (result !== undefined && result.email !== undefined && result.address !== undefined) {
        console.log('Updating ' + result);

        try {
          this.employeeService.createEmployee(employee).subscribe((data) => {
            this.employeeStorageService.updateEmployee(result.address, result.administrator, result.manager).then(() => {
              this.initOrReloadEmployees();

              const dialogRef = this.dialog.open(StatusDialog, {
                data: {successful: true, title: 'Success', message: 'Editing Employee was successful', duration: 2000},
                width: '500px'
              });
            });
          });
        } catch (error) {
          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: false, title: 'Error', message: 'Editing Employee failed: ' + error, duration: 2000},
            width: '500px'
          });
        }
      }
    });
  }

  public importToBlockchain(element: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialog, {
      data: {title: "Import Employee", email: element.email, address: element.address},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);

      if (result !== undefined && result.email !== undefined && result.address !== undefined) {
        console.log('Updating ' + result.email + ' with address ' + result.address + ' and token amount ' + result.tokenAmount);

        let employee: Employee = {
          email: result.email,
          address: result.address,
          balance: 0,
          manager: result.manager,
          administrator: result.administrator,
          clean: true
        };

        this.employeeStorageService.addEmployee(result.address, result.administrator, result.manager).then(() => {
          this.initOrReloadEmployees();

          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: true, title: 'Success', message: 'Importing Employee was successful', duration: 2000},
            width: '500px'
          });
        }).catch((error) => {
          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: false, title: 'Error', message: 'Importing Employee failed: ' + error, duration: 2000},
            width: '500px'
          });
        });
      }
    });
  }

  public deleteEmployee(employee: Employee) {
    try {
      this.employeeService.deleteEmployee(employee.email).subscribe((data) => {
        console.log(data);
        this.employeeStorageService.deleteEmployee(employee.address).then(() => {
          this.initOrReloadEmployees();

          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: true, title: 'Success', message: 'Deleting Employee was successful', duration: 2000},
            width: '500px'
          });
        });
        this.initOrReloadEmployees();
      });
    } catch (error) {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'Deleting Employee failed: ' + error, duration: 2000},
        width: '500px'
      });
    }
  }

  isManagementActionHidden() {
    let managementUser = this.authService.getManagementUser();

    if (managementUser !== undefined) {
      if (managementUser?.administrator) {
        return false;
      }
    }
    return true;
  }

  loadBalance(employee: Employee) {
    this.expandedElementBalance = undefined;
    if (employee.balance === undefined) {
      this.balanceService.getCurrencyCoinBalance(employee.address).then((currencyBalance) => {
        console.log(currencyBalance);

        this.nftIncentiveService.getAllIncentives().subscribe((incentives) => {
          if (incentives !== undefined && incentives != null && incentives.length > 0) {
            this.balanceService.getNftBalance(employee.address, incentives).then((nftBalance) => {
              this.expandedElementBalance = [];
              // @ts-ignore
              this.expandedElementBalance?.push(currencyBalance);

              // @ts-ignore
              this.expandedElementBalance?.push(...nftBalance);
            });
          }
        });
      });
    }
  }

  showTransactions(element: Employee) {
    this.router.navigate(['/admin/transactions/' + element.email]);
  }

  private initOrReloadEmployees() {
    let employees: Employee[];

    this.employeeService.getEmployees().subscribe((backendEmployees) => {
      this.dataSource.data = employees = backendEmployees;
    }).add(() => {
      this.employeeStorageService.getEmployees().then((blockchainEmployees) => {
        if (blockchainEmployees !== undefined && blockchainEmployees != null && blockchainEmployees.length > 0) {
          for (let i = 0; i < blockchainEmployees.length; i++) {
            let blockchainEmployee = blockchainEmployees[i];
            let backendEmployee = employees.find(backendEmployee => backendEmployee.address === blockchainEmployee[0]);

            if (backendEmployee !== undefined && backendEmployee != null) {
              // @ts-ignore
              backendEmployee.administrator = blockchainEmployee[1];
              backendEmployee.manager = blockchainEmployee[2];
              backendEmployee.clean = true;
            }
          }

          if (this.authService.getManagementUser()?.administrator) {
            this.dataSource.data = employees;
          } else {
            this.dataSource.data = employees.filter(employee => employee.manager === this.authService.getManagementUser()?.address);
          }
        }
      });
    });
  }

  getManagerName(employee: Employee) {
    // @ts-ignore
    let manager: Employee = this.dataSource.data.find(item => item.address === employee.manager);
    if (manager !== undefined && manager != null) {
      return manager.email;
    }
    return '';
  }
}

