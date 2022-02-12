import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewdropComponent } from './addnewdrop/addnewdrop.component';
import { DropComponent } from './drop/drop.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '*',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addnewdrop',
    component: AddnewdropComponent,
  },
  {
    path: 'drops/:dropId',
    component: DropComponent,

  },
  {
    path: '**',
    redirectTo: ' '
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
