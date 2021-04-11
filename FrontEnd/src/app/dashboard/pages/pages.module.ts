import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import {SettingsComponent} from './settings/settings.component';
import {ChangePassComponent} from './settings/change-pass/change-pass.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule
  ],
  declarations: [PagesComponent, SettingsComponent, ChangePassComponent]
})
export class PagesModule {}
