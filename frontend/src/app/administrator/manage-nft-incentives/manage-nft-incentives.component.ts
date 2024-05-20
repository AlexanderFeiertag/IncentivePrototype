import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
import {NftIncentiveService} from "../../shared/service/backend/nft-incentive.service";
import {NftIncentiveDialog} from "./nft-incentive-dialog/nft-incentive-dialog";
import {AddressDirectiveComponent} from "../../shared/directives/address-directive/address-directive.component";
import {NftIncentive} from "../../shared/model/nft-incentive";
import {UtilsService} from "../../shared/service/web3/utils.service";
import {StatusDialog} from "../../shared/directives/status-dialog/status-dialog";

@Component({
  selector: 'app-manage-nft-incentives',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButton, MatIconButton, MatIcon, MatPaginator, MatSortModule, MatCheckbox, AddressDirectiveComponent],
  templateUrl: './manage-nft-incentives.component.html',
  styleUrl: './manage-nft-incentives.component.scss'
})
export class ManageNftIncentivesComponent implements AfterViewInit {
  displayedColumns: string[] = ['address', 'symbol', 'name', 'icon', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  protected readonly environment = environment;

  constructor(private nftIncentiveService: NftIncentiveService,
              private utilsService: UtilsService,
              public dialog: MatDialog) {
    this.initOrReloadNftIncentives();
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

  public createNftIncentiveDialog() {
    const dialogRef = this.dialog.open(NftIncentiveDialog, {
      data: {isCreate: true, symbol: '', name: '', address: '', icon: ''},
      width: '600px'
    });

    try {
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.nftIncentiveService.createIncentive(result).subscribe(() => {
            this.initOrReloadNftIncentives();

            const dialogRef = this.dialog.open(StatusDialog, {
              data: {successful: true, title: 'Success', message: 'NFT Incentive created', duration: 2000},
              width: '500px'
            });
          });
        }
      });
    } catch (e) {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'NFT Incentive Creation failed ' + e, duration: 2000},
        width: '500px'
      });
    }
  }

  public editNftDialog(address: string, symbol: string, name: string, icon: number) {
    const dialogRef = this.dialog.open(NftIncentiveDialog, {
      data: {address: address, symbol: symbol, name: name, icon: icon, isCreate: false},
      width: '600px'
    });

    try {
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.nftIncentiveService.updateIncentive(result).subscribe(() => {
            this.initOrReloadNftIncentives();

            const dialogRef = this.dialog.open(StatusDialog, {
              data: {successful: true, title: 'Success', message: 'NFT Incentive edited', duration: 2000},
              width: '500px'
            });
          });
        }
      });
    } catch (e) {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'NFT Incentive Edit failed ' + e, duration: 2000},
        width: '500px'
      });
    }
  }

  public deleteNftIncentive(address: string) {
    try {
      this.nftIncentiveService.deleteIncentive(address).subscribe(() => {
        this.initOrReloadNftIncentives();
      });
    } catch (e) {
      const dialogRef = this.dialog.open(StatusDialog, {
        data: {successful: false, title: 'Error', message: 'NFT Incentive Deletion failed ' + e, duration: 2000},
        width: '500px'
      });
    }
  }

  private initOrReloadNftIncentives() {
    this.nftIncentiveService.getAllIncentives().subscribe(async (data) => {
      let result: NftIncentive[] = data;
      for (let i = 0; i < result.length; i++) {
        result[i].symbol = await this.utilsService.getNftContractSymbol(result[i].address);
        result[i].name = await this.utilsService.getNftContractName(result[i].address);
      }

      this.dataSource.data = result;
    });
  }
}
