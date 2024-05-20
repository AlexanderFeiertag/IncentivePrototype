import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import Web3 from 'web3';
import {Employee} from "../../model/employee";
import {BalanceService} from "./balance.service";
import {EmployeeService} from "../backend/employee.service";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public accountObservable = new Subject<Employee[]>();
  private accounts: Employee[] | undefined;

  private web3: any;
  private intervalId: NodeJS.Timeout | undefined;

  constructor(private balanceService: BalanceService, private employeeService: EmployeeService) {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.initializeEthereumContext();
      });
    }
  }

  public async initializeEthereumContext() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({method: 'eth_requestAccounts'}).then(() => {
        this.web3 = new Web3(window.ethereum);
      }).catch((error: any) => {
        console.error('Error while initializing ethereum context:', error);
      });
    } else {
      console.warn('No ethereum context found!');
    }

    this.intervalId = setInterval(() => this.refreshAccounts(), 1000);
  }

  public async refreshAccounts() {
    if (this.web3 === undefined) {
      return;
    }

    const metamaskAccounts = await this.web3.eth.getAccounts();
    if (metamaskAccounts === undefined || metamaskAccounts.length === 0) {
      console.warn('Couldn\'t get any accounts!');
      return;
    }

    if (!this.accounts || this.accounts.length !== metamaskAccounts.length || this.accounts[0] !== metamaskAccounts[0]) {
      const result: Employee[] = [];
      for (let account of metamaskAccounts) {
        const balance = await this.balanceService.getCurrencyCoinBalance(account);

        let employee = new Employee("", account);
        employee.balance = Number(balance);

        try {
          this.employeeService.getEmployee(account).subscribe((employeeResult) => {
            if (employeeResult !== undefined) {
              employee.email = employeeResult.email;
            }
          });
        } finally {
          result.push(employee);
        }
      }

      this.accountObservable.next(result);
      this.accounts = result;
    }

    if (this.accounts !== undefined && this.accounts.length > 0) {
      clearInterval(this.intervalId);
    }
  }

  public getAccounts(): Employee[] | undefined {
    return this.accounts;
  }
}
