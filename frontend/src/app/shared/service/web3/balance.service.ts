import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {abis} from "../../../../environments/application-binary-interface";
import Web3 from "web3";
import {Balance} from "../../model/balance";
import {NftIncentive} from "../../model/nft-incentive";
import {UtilsService} from "./utils.service";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private utilsService: UtilsService) {
  }

  public async getCurrencyCoinBalance(employeeAddress: string) {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const currencyContract = await new web3.eth.Contract(abis.currencyTokenAbi, environment.currencyTokenAddress);

      let coinName;
      await currencyContract.methods.name(environment.currencyTokenAddress).call().then((name) => {
        coinName = name
      });

      let coinSymbol;
      await currencyContract.methods.symbol(environment.currencyTokenAddress).call().then((symbol) => {
        coinSymbol = symbol;
      });

      let coinBalance;
      await currencyContract.methods.balanceOf(employeeAddress).call().then((balance) => {
        coinBalance = balance;
      });

      let balance: Balance = {
        employeeAddress: employeeAddress,
        symbol: coinSymbol,
        name: coinName,
        address: environment.currencyTokenAddress,
        amount: coinBalance,
        ids: undefined,
        isNft: false,
      }

      return balance;
    } else {
      throw new Error('No ethereum context found!');
    }
  }

  public async getNftBalance(employeeAddress: string, incentives: NftIncentive[]) {
    let balances: Balance[] = [];

    if (typeof window.ethereum !== 'undefined') {
      if (incentives !== undefined && incentives != null && incentives.length > 0) {
        for (let i = 0; i < incentives.length; i++) {
          const incentive = incentives[i];

          const amount = await BalanceService.nftBalanceOfEmployee(incentive.address, employeeAddress);
          const name = await this.utilsService.getNftContractName(incentive.address);
          const symbol = await this.utilsService.getNftContractSymbol(incentive.address);

          let balance: Balance = {
            employeeAddress: employeeAddress,
            symbol: symbol,
            name: name,
            address: incentive.address,
            amount: amount,
            ids: [],
            isNft: true,
          };

          // @ts-ignore
          if (amount > 0) {
            balances.push(balance);
          }
        }
      }

      return balances;
    } else {
      throw new Error('No ethereum context found!');
    }
  }

  public static async nftBalanceOfEmployee(contractAddress: string | undefined, employeeAddress: string) {
    const web3 = new Web3(window.ethereum);
    const nftContract = await new web3.eth.Contract(abis.nftTokenAbi, contractAddress);

    let balanceOfEmployee;
    await nftContract.methods.balanceOf(employeeAddress).call().then((balance) => {
      balanceOfEmployee = balance;
    });
    return balanceOfEmployee;
  }


}
