import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {abis} from "../../../../environments/application-binary-interface";
import Web3 from "web3";
import {BrowserProvider, Contract, Provider, utils} from "zksync-ethers";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EmployeeStorageService {

  constructor() {
  }

  public async getEmployees() {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const currencyContract = await new web3.eth.Contract(abis.employeeStorageAbi, environment.employeeStorageAddress);
      const blockChainEmployees = currencyContract.methods.getEmployees().call();
      return blockChainEmployees;
    }
  }

  public async addEmployee(address: string, administrator: boolean, manager: string) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Provider(environment.rpcUrl);
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const contract = new Contract(environment.employeeStorageAddress, abis.employeeStorageAbi, signer);

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(environment.paymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      const transaction = await contract.addEmployee(address, administrator === undefined || administrator == null ? false : administrator, manager, {
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

  public async updateEmployee(address: string, administrator: boolean, manager: string) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Provider(environment.rpcUrl);
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const contract = new Contract(environment.employeeStorageAddress, abis.employeeStorageAbi, signer);

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(environment.paymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      const transaction = await contract.updateEmployee(address, administrator === undefined || administrator == null ? false : administrator, manager, {
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

  public async deleteEmployee(address: string) {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new Provider(environment.rpcUrl);
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const contract = new Contract(environment.employeeStorageAddress, abis.employeeStorageAbi, signer);

      const gasPrice = await provider.getGasPrice();
      const paymasterParams = utils.getPaymasterParams(environment.paymasterAddress, {
        type: "General",
        innerInput: new Uint8Array(),
      });
      const transaction = await contract.deleteEmployee(address, {
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
