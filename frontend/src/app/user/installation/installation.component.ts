import {Component, ViewChild} from '@angular/core';
import {MatStep, MatStepper} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {environment} from "../../../environments/environment";
import {WalletService} from "../../shared/service/web3/wallet.service";
import {Employee} from "../../shared/model/employee";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeService} from "../../shared/service/backend/employee.service";
import {MatInputModule} from "@angular/material/input";
import {RegistrationService} from "../../shared/service/web3/registration.service";
import {MatDialog} from "@angular/material/dialog";
import {StatusDialog} from "../../shared/directives/status-dialog/status-dialog";

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatStepper,
    MatStep,
    MatButton,
    MatLabel,
    NgIf
  ],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.scss'
})
export class InstallationComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  firstFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
    address: ['', Validators.required]
  });
  protected readonly environment = environment;

  constructor(private _formBuilder: FormBuilder,
              private walletService: WalletService,
              private employeeService: EmployeeService,
              private registrationService: RegistrationService,
              private dialog: MatDialog) {
    this.walletService.accountObservable.subscribe((accounts: Employee[]) => {
      this.firstFormGroup.setValue({
        email: this.firstFormGroup.value.email !== undefined ? this.firstFormGroup.value.email : null,
        address: accounts[0].address,
      });
    });
  }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }

  addZksyncToMetaMask() {
    this.registrationService.addNetworkToMetaMask();
  }

  addTokenToMetaMask() {
    this.registrationService.addTokenToMetaMask();
  }

  createEmployee() {
    let employee: Employee;
    employee = {
      address: this.firstFormGroup.value.address ? this.firstFormGroup.value.address : "",
      email: this.firstFormGroup.value.email ? this.firstFormGroup.value.email : "",
      balance: undefined,
      administrator: undefined,
      manager: undefined,
      clean: undefined,
    };

    try {
      this.employeeService.createEmployee(employee).subscribe((result) => {
        if (result !== undefined) {
          this.dialog.open(StatusDialog, {
            data: {
              success: true,
              title: 'Success',
              message: 'Employee has been created successfully.',
              delay: 2000,
            }
          });
        }
      });
    } catch (e) {
      this.dialog.open(StatusDialog, {
        data: {
          success: false,
          title: 'Error',
          message: 'Employee could not be created.' + e,
          delay: 2000,
        }
      });
    }

    window.location.reload();
  }
}
