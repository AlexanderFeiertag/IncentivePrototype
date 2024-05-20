import {Injectable} from '@angular/core';
import {Employee} from "../model/employee";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  login(employee: Employee): boolean {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("management_user", JSON.stringify(employee));
      return true;
    }

    return false;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("management_user");
    }
  }

  isAuthenticatedUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem("management_user");
    }
    return false;
  }

  getManagementUser(): Employee | null {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem("management_user");
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }
}
