import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'exam', pathMatch: 'full' },
      {
        path: 'exam',
        loadChildren: () => import('./exam/exam.module').then( m => m.ExamModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then( m => m.StudentModule )
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
