import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab3MapaPage } from './tab3-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3MapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3MapaPageRoutingModule {}
