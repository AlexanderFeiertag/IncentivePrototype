import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {CurrencyIncentive} from "../../model/currency-incentive";

@Injectable({
  providedIn: 'root'
})
export class CoinIncentiveService {

  constructor(private http: HttpClient) {
  }

  public createIncentive(incentive: CurrencyIncentive) {
    return this.http.post<CurrencyIncentive>(environment.backendUrl + '/incentive/', incentive);
  }

  public updateIncentive(incentive: CurrencyIncentive) {
    return this.http.put<CurrencyIncentive>(environment.backendUrl + '/incentive/', incentive);
  }

  public getAllIncentives() {
    return this.http.get<CurrencyIncentive[]>(environment.backendUrl + '/incentive/');
  }

  public getAvailableIncentives() {
    return this.http.get<CurrencyIncentive[]>(environment.backendUrl + '/incentive/available');
  }
  
  public deleteIncentive(name: string) {
    return this.http.delete(environment.backendUrl + '/incentive/' + name);
  }
}
