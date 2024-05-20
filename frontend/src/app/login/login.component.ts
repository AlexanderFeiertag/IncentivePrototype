import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {Employee} from "../shared/model/employee";
import {EmployeeService} from "../shared/service/backend/employee.service";
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "../shared/service/auth.service";
import {EmployeeStorageService} from "../shared/service/web3/employee-storage.service";
import {StatusDialog} from "../shared/directives/status-dialog/status-dialog";
import {MatDialog} from '@angular/material/dialog';
import {WalletService} from "../shared/service/web3/wallet.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelect,
    FormsModule,
    MatOption,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  adminsAndManagers: Employee[] = [];
  selectedAdminOrManager: Employee | undefined = undefined;

  constructor(private employeeService: EmployeeService,
              private authService: AuthService,
              private walletService: WalletService,
              private router: Router,
              private employeeStorageService: EmployeeStorageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      this.employeeStorageService.getEmployees().then(blockChainEmployees => {

        // Add email to the employee object
        if (blockChainEmployees !== undefined && blockChainEmployees != null && blockChainEmployees.length > 0) {
          this.employeeService.getEmployees().subscribe(backendEmployees => {
            for (let i = 0; i < blockChainEmployees.length; i++) {
              let blockChainEmployee = blockChainEmployees[i];
              let backendEmployee = backendEmployees.find(backendEmployee => backendEmployee.address === blockChainEmployee[0]);
              if (backendEmployee !== undefined) {
                let employee = new Employee(backendEmployee.email, blockChainEmployee[0]);
                employee.administrator = blockChainEmployee[1];

                // Check if the employee is an administrator or a manager
                let subsidiaries = blockChainEmployees.find(blockChainEmployee => blockChainEmployee[2] === employee.address);
                if (employee.administrator || subsidiaries !== undefined) {
                  this.adminsAndManagers.push(employee);
                }
              }
            }
          });
        }
      }).catch(error => {
        const dialogRef = this.dialog.open(StatusDialog, {
          data: {successful: false, title: 'Error', message: 'Loading employees failed: ' + error, duration: 2000},
          width: '500px'
        });
      });
    }
  }

  getConnectedAccountAddress() {
    let accounts = this.walletService.getAccounts();
    if (accounts !== undefined) {
      return accounts[0].address;
    }
    return '';
  }

  login() {
    if (this.selectedAdminOrManager !== undefined) {
      this.authService.login(this.selectedAdminOrManager);
      this.router.navigate(['/admin']);
    }
  }
}
