import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {CoinIncentiveService} from "../../shared/service/backend/coin-incentive.service";
import {CurrencyIncentiveDialog} from "./currency-incentive-dialog/currency-incentive-dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {StatusDialog} from "../../shared/directives/status-dialog/status-dialog";


@Component({
  selector: 'app-manage-currency-incentives',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButton, MatIconButton, MatIcon, MatPaginator, MatSortModule, MatCheckbox],
  templateUrl: './manage-currency-incentives.component.html',
  styleUrl: './manage-currency-incentives.component.scss'
})
export class ManageCurrencyIncentivesComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'icon', 'price', 'available', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  protected readonly environment = environment;

  constructor(private incentiveService: CoinIncentiveService,
              public dialog: MatDialog) {
    this.initOrReloadIncentives();
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

  private initOrReloadIncentives() {
    this.incentiveService.getAllIncentives().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public createCurrencyIncentiveDialog() {
    const dialogRef = this.dialog.open(CurrencyIncentiveDialog, {
      data: {isCreate: true, name: '', description: '', icon: '', price: 0, available: true},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.incentiveService.createIncentive(result).subscribe(() => {
          this.initOrReloadIncentives();

          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: true, title: 'Success', message: 'Creating Incentive was successfull', duration: 2000},
            width: '500px'
          });
        });
      }
    });
  }

  public editIncentiveDialog(name: string, description: string, icon: string, price: number, available: boolean) {
    const dialogRef = this.dialog.open(CurrencyIncentiveDialog, {
      data: {name: name, description: description, icon: icon, price: price, available: available, isCreate: false},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.incentiveService.updateIncentive(result).subscribe(() => {
          this.initOrReloadIncentives();

          const dialogRef = this.dialog.open(StatusDialog, {
            data: {successful: true, title: 'Success', message: 'Editing Incentive was successful', duration: 2000},
            width: '500px'
          });
        });
      }
    });
  }

  public deleteIncentive(name: string) {
    try {
      this.incentiveService.deleteIncentive(name).subscribe(() => {
        this.initOrReloadIncentives();

        const dialogRef = this.dialog.open(StatusDialog, {
          data: {successful: true, title: 'Success', message: 'Deleting Incentive was successfull', duration: 2000},
          width: '500px'
        });
      });
    } catch (e) {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'Deleting Incentive failed: ' + e, duration: 2000},
        width: '500px'
      });
    }
  }
}
