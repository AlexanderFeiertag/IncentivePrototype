import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
