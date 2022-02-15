import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Drop } from '../drop-instance/drop-instance';

@Component({
  selector: 'app-addnewdrop',
  templateUrl: './addnewdrop.component.html',
  styleUrls: ['./addnewdrop.component.scss']
})
export class AddnewdropComponent implements OnInit {
  newDrop: FormGroup;

  constructor() {
    this.newDrop = new FormGroup({
      projectName: new FormControl(),
      projectDescription: new FormControl(),
      websiteUrl: new FormControl(),
      twitterUrl: new FormControl(),
      discordUrl: new FormControl(),
      imageUrl: new FormControl(),
      presaleDate: new FormControl(),
      launchDate: new FormControl(),
      price: new FormControl(),
      totalSupply: new FormControl(),
      chain: new FormControl(),
    });
  }

  submitForm() {

  }

  ngOnInit(): void {

  }

}
