import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {environment} from "../environments/environment";
import {filter} from "rxjs";
import {AuthService} from "./shared/service/auth.service";
import {WalletService} from "./shared/service/web3/wallet.service";
import {EmployeeService} from './shared/service/backend/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  data: Data = {
    data: {
      title: 'User-View',
      color: 'primary',
      actionLabel: 'Management-View',
      actionRoute: '/admin',
      actionIcon: 'key'
    }
  };
  protected readonly environment = environment;
  protected email: string | undefined;

  constructor(private router: Router,
              private authService: AuthService,
              private walletSerive: WalletService,
              private employeeService: EmployeeService) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.getRoutingData();
      });
  }

  navigateTo(route: string) {
    this.authService.logout();
    this.router.navigate([route]);
  }

  private getRoutingData() {
    this.router.config.map(routeConfig => {
      let url = this.router.url.split('/');
      if (routeConfig.path === url[1]) {
        this.data = routeConfig;
      }
    });
  }

  ngAfterViewInit(): void {
    this.walletSerive.accountObservable.subscribe((accounts) => {
      if (accounts !== undefined) {
        this.email = accounts[0].email !== undefined ? accounts[0].email : '';
      }
    });
  }
}
