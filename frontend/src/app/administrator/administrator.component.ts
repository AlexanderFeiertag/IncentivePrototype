import {Component} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {ManageEmployeesComponent} from "./manage-employees/manage-employees.component";
import {ManageCurrencyIncentivesComponent} from "./manage-currency-incentives/manage-currency-incentives.component";
import {ManageTransactionsComponent} from "./manage-transactions/manage-transactions.component";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../shared/service/auth.service";

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [
    LoginComponent,
    ManageEmployeesComponent,
    ManageCurrencyIncentivesComponent,
    ManageTransactionsComponent,
    MatTabsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.scss'
})
export class AdministratorComponent {

  constructor(private router: Router,
              private authService: AuthService) {

  }

  isActive(employees: string) {
    let url = this.router.url.split('/');
    return url[2] === employees;
  }

  isAdmin() {
    return this.authService.getManagementUser()?.administrator;
  }
}
