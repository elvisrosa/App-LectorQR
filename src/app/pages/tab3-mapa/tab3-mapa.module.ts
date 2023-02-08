import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab3MapaPageRoutingModule } from './tab3-mapa-routing.module';

import { Tab3MapaPage } from './tab3-mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab3MapaPageRoutingModule
  ],
  declarations: [Tab3MapaPage]
})
export class Tab3MapaPageModule {}
