import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {Employee} from "../../model/employee";
import {NftIncentive} from "../../model/nft-incentive";

@Injectable({
  providedIn: 'root'
})
export class NftIncentiveService {

  constructor(private http: HttpClient) {
  }

  public createIncentive(incentive: NftIncentive) {
    return this.http.post<Employee>(environment.backendUrl + '/nft-incentive/', incentive);
  }

  public updateIncentive(incentive: NftIncentive) {
    return this.http.put<Employee>(environment.backendUrl + '/nft-incentive/', incentive);
  }

  public getAllIncentives() {
    return this.http.get<NftIncentive[]>(environment.backendUrl + '/nft-incentive/all');
  }

  public deleteIncentive(name: string) {
    return this.http.delete(environment.backendUrl + '/nft-incentive/' + name);
  }
}
