import { Injectable } from '@angular/core';
import { Web3ModalService } from '@mindsorg/web3modal-angular';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink, { WalletLinkProvider } from 'walletlink';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class DappService {
  provider:any;
  connected:boolean = false;
  constructor (private web3ModalService:Web3ModalService) {}
  async loadModal() {
    this.web3ModalService.setConfiguration({
      disableInjectedProvider: false,
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            appName: "nftraries",
            infuraId: "2098fc00d6de4bc494cc0adac897d2b5"
          },
        },
        walletlink: {
          package: WalletLinkProvider,
          options: {
            appName: "nftraries",
            infuraUrl: "https://mainnet.infura.io/v3/2098fc00d6de4bc494cc0adac897d2b5",
            infuraId: "2098fc00d6de4bc494cc0adac897d2b5"
          }
        }
      },
      network: 'mainnet',
    });

      this.provider = await this.web3ModalService.open();
      this.connected = true;
      return this.provider;
//   this.web3 = new Web3(this.provider);
//  const chainId = await this.web3.eth.getChainId();
//  if(chainId !== 97) {
//    alert('Please connect to a bsc testnet');
//    await this.web3ModalService.close();
//    return;
//  }
//  else {
//   this.accounts =  await this.web3.eth.getAccounts();
//   this.account = this.accounts[0];
//   this.connect = this.account.substring(0, 6);
//   // this.provider.on('accountsChanged', (account:string) => {
//   //   this.account = account[0];
//   //   console.log(this.account);
//   // });
//  }
//  console.log(chainId);

}

}
