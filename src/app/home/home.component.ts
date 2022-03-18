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
    this.drops = await this.dappService.loadContract();
  }

  async ngOnInit() {
    setInterval(()=> {this.loadContract()}, 5000);
  }
}
