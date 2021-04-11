import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BecomeGuardianRoutingModule } from './become-guardian-routing.module';
import {BecomeGuardianComponent} from './become-guardian.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [BecomeGuardianComponent],
  imports: [
    CommonModule,
    IonicModule,
    BecomeGuardianRoutingModule
  ]
})
export class BecomeGuardianModule { }
