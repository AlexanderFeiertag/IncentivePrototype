import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {Component, Inject, OnInit} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {EmployeeService} from "../../../shared/service/backend/employee.service";
import {Employee} from "../../../shared/model/employee";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {EmployeeStorageService} from "../../../shared/service/web3/employee-storage.service";

export interface EmployeeDialogData {
  title: string;
  email: string;
  address: string;
  manager: string;
  administrator: boolean;
  tokenAmount: number;
}

@Component({
  selector: 'employee-dialog',
  templateUrl: 'employee-dialog.html',
  styleUrl: './employee-dialog.scss',
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
    MatCheckbox,
  ],
})
export class EmployeeDialog implements OnInit {

  employees: Employee[] = [];

  constructor(public dialogRef: MatDialogRef<EmployeeDialog>,
              @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData,
              private employeeService: EmployeeService,
              private employeeStorageService: EmployeeStorageService) {
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

                this.employees.push(employee);
              }
            }
          });
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
