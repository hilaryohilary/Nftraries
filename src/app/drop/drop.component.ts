import { Component, OnInit } from '@angular/core';
import { DappService } from '../dapp.service';
import { ActivatedRoute } from '@angular/router';
import { Drops } from '../drops';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {
  dropName: string = "";
  drop: Drops[] = [];

  constructor(private dappService: DappService, private routes: ActivatedRoute) { }

  async ngOnInit() {
    this.routes.queryParams.subscribe((param: any) => {
      this.dropName = param.drop;
      console.log(param.drop);
    });
    this.drop = await this.dappService.getDrop(this.dropName);
    console.log(this.drop);
  }

}
