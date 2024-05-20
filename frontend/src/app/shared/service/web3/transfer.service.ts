import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {abis} from "../../../../environments/application-binary-interface";
import {Contract, utils, Provider, BrowserProvider} from "zksync-ethers";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() {
  }

  public async transferCurrencyCoinToEmployee(address: string, amount: number) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Provider(environment.rpcUrl);
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const contract = new Contract(environment.currencyTokenAddress, abis.currencyTokenAbi, signer);

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(environment.paymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      const transaction = await contract.transfer(address, amount, {
        maxPriorityFeePerGas: BigInt(0),
        maxFeePerGas: gasPrice,
        gasLimit: 6000000,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      });

      await transaction.wait();
      return transaction;
    }
    return undefined;
  }

  public async transferCurrencyCoinToOwner(amount: number) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Provider(environment.rpcUrl);
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const contract = new Contract(environment.currencyTokenAddress, abis.currencyTokenAbi, signer);

      console.log(amount);

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(environment.paymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      const transaction = await contract.transferToOwner(amount, {
        maxPriorityFeePerGas: BigInt(0),
        maxFeePerGas: gasPrice,
        gasLimit: 6000000,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      });

      await transaction.wait();
      return transaction;
    }
    return undefined;
  }

  public async transferNftIncentives(address: string, tokenAddress: string) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Provider(environment.rpcUrl);
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const contract = new Contract(tokenAddress, abis.nftTokenAbi, signer);

      console.log(contract)

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(environment.paymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      const transaction = await contract.mint(address, {
        maxPriorityFeePerGas: BigInt(0),
        maxFeePerGas: gasPrice,
        gasLimit: 6000000,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      });

      await transaction.wait();
      return transaction;
    }
    return undefined;
  }
}
