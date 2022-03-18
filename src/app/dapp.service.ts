import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3ModalService } from '@mindsorg/web3modal-angular';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink, { WalletLinkProvider } from 'walletlink';
import Web3 from 'web3';

import contractAddress from '../app/contract';
import { Drops } from './drops';

@Injectable({
  providedIn: 'root'
})
export class DappService {
  provider:any;
  connected:boolean = false;
  dappService: any;
  drops: Drops[] = [];
  private web3: any;
  account: any;

  constructor (private web3ModalService:Web3ModalService, private snackBar: MatSnackBar) {}
  async loadModal() {
    this.web3ModalService.setConfiguration({
      disableInjectedProvider: false,
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            appName: "nftraries",
            infuraId: "2098fc00d6de4bc494cc0adac897d2b5",
            infuraUrl: "https://mainnet.infura.io/v3/2098fc00d6de4bc494cc0adac897d2b5",
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

  async loadContract(){
    if(this.connected == true) {
      try {
        this.web3 = new Web3(this.provider);
        const contract = new this.web3.eth.Contract(contractAddress.abi, contractAddress.contractAddress);
        this.drops = await contract.methods.getDrops().call();
      }
      catch(err) {
        console.log(err);
      }
    }
    return this.drops;
  }

  async getDrop(drop: string) {
    return this.drops.filter(d => drop === d.name);
  }

  async submitDrop(
     imageUri: string,
         name: string,
         description: string,
         social_1: string,
         social_2: string,
         websiteUri: string,
         price: string,
         supply: number,
         presale: number,
         sale: number,
         chain: number
  ) {

    if (this.connected !== true) {
      alert('Connect to bsc testnet');
    }
    else {
        try {
          this.web3 = new Web3(this.provider);
          const contract = new this.web3.eth.Contract(contractAddress.abi, contractAddress.contractAddress);
          await contract.methods.addDrop({
            imageUri,
            name,
            description,
            social_1,
            social_2,
            websiteUri,
            price,
            supply,
            presale,
            sale,
            chain
          }).send({from: this.account}).then((result: any) => {
            this.snackBar.open('Form successfully submitted.', '', {
              panelClass: ['snackbar-success']
            });
            console.log(result);
          });

        }
        catch(error) {
          console.log(error);
          this.snackBar.open('Something went wrong.', '', {
            panelClass: ['snackbar-error']
          });
        }
      }
    }
  }
