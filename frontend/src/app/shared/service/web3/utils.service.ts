import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {abis} from "../../../../environments/application-binary-interface";
import Web3 from "web3";
import {Balance} from "../../model/balance";
import {NftIncentive} from "../../model/nft-incentive";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public async getNftContractName(contractAddress: string | undefined) {
    const web3 = new Web3(window.ethereum);
    const nftContract = await new web3.eth.Contract(abis.nftTokenAbi, contractAddress);

    let name;
    await nftContract.methods.name(contractAddress).call().then((value) => {
      name = value;
    });
    return name;
  }

  public async getNftContractSymbol(contractAddress: string | undefined) {
    const web3 = new Web3(window.ethereum);
    const nftContract = await new web3.eth.Contract(abis.nftTokenAbi, contractAddress);

    let symbol;
    await nftContract.methods.symbol(contractAddress).call().then((value) => {
      symbol = value;
    });
    return symbol;
  }
}
