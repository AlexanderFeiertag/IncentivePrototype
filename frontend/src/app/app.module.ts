import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {EmployeeService} from "./shared/service/backend/employee.service";
import {WalletService} from "./shared/service/web3/wallet.service";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatButtonModule,
    MatIcon
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    WalletService,
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
