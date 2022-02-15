import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

window as any;
import Web3 from 'web3';
import contractAddress from './contract';
import abi from './contract';
import { DappService } from './dapp.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nftraries';
  connect = 'Connect Wallet';
  connected: boolean = false;
  private web3:any;
  account: string = '';
  accounts:string[] = [];
  drops: [] = [];
  drops$ = new BehaviorSubject([]);
  provider: any;


  constructor(private dappService: DappService) {}

  async loadModale() {
    this.provider = await this.dappService.loadModal();
    console.log(this.provider, this.dappService.connected);

    this.web3 = new Web3(this.provider);
    let chainId = await this.web3.eth.getChainId();
    if( chainId !== 97) {
      alert("please connect to bsc testnet");
      this.dappService.connected = false;
      return;
    }
    else {
      this.accounts = await this.web3.eth.getAccounts();
      this.account = this.accounts[0];
      this.connect = this.account.substring(0,7);
    }

     setInterval(() => {
      this.provider.on('accountsChanged', async() => {
      this.accounts = await this.web3.eth.getAccounts();
      this.dappService.connected = true;
      this.account = this.accounts[0];
      this.connect = this.account.substring(0,7);
      });

      this.provider.on('chainChanged', async() => {
        chainId = await this.web3.eth.getChainId();
        console.log(chainId);
        if(chainId !== 97) {
          window.location.reload();
        }
      });

    }, 100);
  }

  async loadContract() {
  const contract = new this.web3.eth.Contract(contractAddress.abi, contractAddress.contractAddress);
  this.drops = await contract.methods.getDrops().call();
  this.drops$.next(this.drops);
  console.log(contract, this.drops);
  }


 async ngOnInit(){
   await this.loadModale();
  }

}
