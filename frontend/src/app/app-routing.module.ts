import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {AdministratorComponent} from "./administrator/administrator.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./shared/service/auth.guard";
import {InstallationComponent} from "./user/installation/installation.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    data: {
      title: 'User-View',
      color: 'primary',
      actionLabel: 'Go to Management-View',
      actionRoute: '/admin',
      actionIcon: 'key'
    },
    component: UserComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Management-View',
      color: 'accent',
      actionLabel: 'Go to User-View',
      actionRoute: '/user',
      actionIcon: 'person'
    }
  },
  {
    path: 'admin',
    component: AdministratorComponent,
    data: {
      title: 'Management-View',
      color: 'accent',
      actionLabel: 'Go to User-View',
      actionRoute: '/user',
      actionIcon: 'person'
    },
    canActivate: [AuthGuard],
    loadChildren: () => import('./administrator/administrator-routes').then(routes => routes.administratorRoutes),
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
