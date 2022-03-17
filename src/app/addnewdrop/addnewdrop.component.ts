import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Drop } from '../drop-instance/drop-instance';
import { MatSnackBar } from '@angular/material/snack-bar';
import { __values } from 'tslib';
import { DappService } from '../dapp.service';


@Component({
  selector: 'app-addnewdrop',
  templateUrl: './addnewdrop.component.html',
  styleUrls: ['./addnewdrop.component.scss']
})
export class AddnewdropComponent implements OnInit {
  newDrop: FormGroup;
  projectNameErrorMessage: string = '';

  constructor(private fb: FormBuilder, private dappService: DappService
    ) {
      this.newDrop = this.fb.group({
        projectName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        projectDescription:  ['', [Validators.required, Validators.minLength(30), Validators.maxLength(200)]],
        websiteUrl: ['', [Validators.required, Validators.pattern('https://.*')]],
        twitterUrl: ['', [Validators.required, Validators.pattern('https://twitter.com/.*')]],
        discordUrl: ['', Validators.required],
        imageUrl: ['', Validators.required],
        presaleDate: ['', Validators.required],
        launchDate:  ['', Validators.required],
        price:  ['', Validators.required],
        totalSupply:  ['', Validators.required],
        chain:  ['', Validators.required]
      })
    }

    private projectNameValidation = {
      required: 'Please enter the project name',
      minLength: 'Must be a minimum of 3 characters',
      maxLength: 'Must be a maximum of 25 characters'
    }


    // helper function
    get(value: string) {
     return this.newDrop.get(value)?.value;
    }

 async submitDrop() {
    const imageValue = this.get('imageUrl');
    const name = this.get('projectName');
    const description = this.get('projectDescription');
    const twitter = this.get('twitterUrl');
    const discord = this.get('discordUrl');
    const website = this.get('websiteUrl');
    const price = this.get('price');
    const supply = this.get('totalSupply');
    let presale = this.get('presaleDate');
    let sale = this.get('launchDate');
    const chain = this.get('chain');

    presale = new Date(presale).getTime();
    sale = new Date(sale).getTime();
    console.log(presale, sale);

    // try  {
    //   await this.dappService.submitDrop(imageValue, name, description, twitter,discord, website, price, supply, presale, sale, chain)
    // }

    // catch(error) {
    //  console.log(error);
    // }
  }



  ngOnInit(): void {
    const projectNameControl = this.newDrop.get('projectName');
    projectNameControl?.statusChanges.subscribe((value) => {
      if(value.length < 3 || value.length === null) {
        this.projectNameErrorMessage = this.projectNameValidation.minLength;
      }
      else if (value.length > 25) {
        this.projectNameErrorMessage = this.projectNameValidation.maxLength;
      }
    }
    )
  }

}
