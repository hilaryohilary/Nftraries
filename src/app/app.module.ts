import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Web3ModalComponent, Web3ModalModule, Web3ModalService } from '@mindsorg/web3modal-angular';
import WalletConnectProvider from '@walletconnect/web3-provider';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';



import WalletLink, { WalletLinkProvider } from 'walletlink';
import { FormsModule } from '@angular/forms';
import { AddnewdropComponent } from './addnewdrop/addnewdrop.component';
import { DropComponent } from './drop/drop.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';



const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "2098fc00d6de4bc494cc0adac897d2b5" // required
    }
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "nftraries",
      infuraUrl: "https://mainnet.infura.io/v3/2098fc00d6de4bc494cc0adac897d2b5",
      infuraId: "2098fc00d6de4bc494cc0adac897d2b5"
    }
  }
}
@NgModule({
  declarations: [
    AppComponent,
    AddnewdropComponent,
    DropComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Web3ModalModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  entryComponents: [Web3ModalComponent],
  providers: [{
    provide: Web3ModalService,
    useFactory: () => {
      return new Web3ModalService({
        disableInjectedProvider: false,
        network: "mainnet",
        cacheProvider: true,
        providerOptions
      })
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
