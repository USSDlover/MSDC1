import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
