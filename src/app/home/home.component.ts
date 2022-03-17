import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { DappService } from '../dapp.service';
import contractAddress from '../contract';
import { Drops } from '../drops';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  connected: boolean = false;
  drops: Drops[] = [];
  private web3: any;
  constructor(private dappService: DappService) { }

  connect() {
    this.connected = this.dappService.connected;
    return this.connected;
  }



  async loadContract() {
    if(this.connected == true) {
      try {
        this.web3 = new Web3(this.dappService.provider);
        console.log(this.web3);
        const contract = new this.web3.eth.Contract(contractAddress.abi, contractAddress.contractAddress);
      this.drops = await contract.methods.getDrops().call();
    }
    catch(err) {
      console.log(err);
    }
    }
    return this.drops;
  }

  async ngOnInit() {
    setInterval(()=> {this.loadContract()}, 1000);
  }
}
