import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/Exam',
    pathMatch: 'full'
  },
  {
    path: 'pages/:id',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
