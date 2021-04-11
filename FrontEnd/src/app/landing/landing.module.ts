import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import {LandingComponent} from './landing.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    IonicModule,
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
