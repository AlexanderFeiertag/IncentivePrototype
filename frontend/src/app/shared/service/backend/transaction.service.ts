import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {Transaction} from "../../model/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  public createCurrencyTransaction(transaction: Transaction) {
    console.log(environment.backendUrl + '/transaction/', transaction);
    return this.http.post<any>(environment.backendUrl + '/transaction/', transaction);
  }

  public getTransactions() {
    return this.http.get<Transaction[]>(environment.backendUrl + '/transaction/');
  }

  public getTransactionByUser(address: string) {
    return this.http.get<Transaction[]>(environment.backendUrl + '/transaction/' + address);
  }
}
