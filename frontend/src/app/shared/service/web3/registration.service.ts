import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {abis} from "../../../../environments/application-binary-interface";
import {Balance} from "../../model/balance";
import Web3 from "web3";
import {UtilsService} from "./utils.service";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private utilsService: UtilsService) {
  }

  public async addNetworkToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x' + Number(environment.chainId).toString(16),
            chainName: environment.chainName,
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: [environment.rpcUrl],
            blockExplorerUrls: [environment.chainExplorer]
          }
        ]
      }).then((result: any) => {
        console.log('Added Smart Chain to MetaMask:', result);
      }).catch((error: any) => {
        console.error('Error adding Smart Chain to MetaMask:', error);
      });
    }
  }

  public async addTokenToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      const symbol = await this.utilsService.getNftContractSymbol(environment.currencyTokenAddress);

      window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: environment.currencyTokenAddress,
            symbol: symbol,
            image: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png'
          }
        }

      }).then((result: any) => {
        console.log('Added Token to MetaMask:', result);
      }).catch((error: any) => {
        console.error('Error adding Token to MetaMask:', error);
      });
    }
  }

  public async addNFTToMetaMask(balance: Balance) {
    if (typeof window.ethereum !== 'undefined') {
      if (balance.isNft) {

        console.log(balance)
        if (balance.amount !== undefined && balance.amount > 0) {
          for (let tokenId = 1; tokenId <= balance.amount; tokenId++) {
            const web3 = new Web3(window.ethereum);
            const currencyContract = await new web3.eth.Contract(abis.nftTokenAbi, balance.address);

            await currencyContract.methods.ownerOf(tokenId).call().then((owner) => {
              if (owner == balance.employeeAddress) {
                balance.ids?.push(tokenId);
              }
            });
          }

          // @ts-ignore
          for (let nft of balance.ids) {
            window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC721',
                options: {
                  address: balance.address,
                  symbol: balance.symbol,
                  tokenId: nft.toString()
                }
              }
            });
          }
        }
      } else {
        window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: balance.address,
              symbol: balance.symbol
            }
          }
        });
      }
    }
  }
}
