import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BecomeGuardianComponent} from './become-guardian.component';

const routes: Routes = [
  {
    path: '',
    component: BecomeGuardianComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BecomeGuardianRoutingModule { }
