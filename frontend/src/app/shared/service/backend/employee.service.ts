import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {Employee} from "../../model/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  public createEmployee(employee: Employee) {
    return this.http.post<Employee>(environment.backendUrl + '/employee/', employee);
  }

  public updateEmployee(employee: Employee) {
    return this.http.put<Employee>(environment.backendUrl + '/employee/', employee);
  }

  public deleteEmployee(email: string) {
    return this.http.delete<Employee>(environment.backendUrl + '/employee/' + email);
  }

  public getEmployees() {
    return this.http.get<Employee[]>(environment.backendUrl + '/employee/');
  }

  public getEmployee(address: string) {
    return this.http.get<Employee>(environment.backendUrl + '/employee/' + address);
  }
}
