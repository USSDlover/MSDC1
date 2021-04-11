import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule
  ],
  declarations: [PagesComponent]
})
export class PagesModule {}
