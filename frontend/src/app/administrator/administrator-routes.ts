import {Routes} from "@angular/router";
import {AuthGuard} from "../shared/service/auth.guard";

export const administratorRoutes: Routes = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadComponent: () => import('./manage-employees/manage-employees.component').then(c => c.ManageEmployeesComponent)
  },
  {
    path: 'nft-incentives',
    canActivate: [AuthGuard],
    loadComponent: () => import('./manage-nft-incentives/manage-nft-incentives.component').then(m => m.ManageNftIncentivesComponent)
  },
  {
    path: 'currency-incentives',
    canActivate: [AuthGuard],
    loadComponent: () => import('./manage-currency-incentives/manage-currency-incentives.component').then(m => m.ManageCurrencyIncentivesComponent)
  },
  {
    path: 'transactions',
    canActivate: [AuthGuard],
    loadComponent: () => import('./manage-transactions/manage-transactions.component').then(m => m.ManageTransactionsComponent)
  },
  {
    path: 'transactions/:email',
    canActivate: [AuthGuard],
    loadComponent: () => import('./manage-transactions/manage-transactions.component').then(m => m.ManageTransactionsComponent)
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
]
