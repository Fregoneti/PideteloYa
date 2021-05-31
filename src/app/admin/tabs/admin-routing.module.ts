import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    // component: AdminPage
    component: AdminPage
  },
  {
    // path: '/admin/tabadmin1',
    path: 'tabadmin1',
    loadChildren: () => import('../tabadmin1/tabadmin1.module').then(m => m.Tabadmin1PageModule)
  },
  {
    // path: '/admin/tabadmin2',
    path: 'tabadmin2',
    loadChildren: () => import('../tabadmin2/tabadmin2.module').then(m => m.Tabadmin2PageModule)
  },
  {
    // path: '/admin/tabadmin1',
    path: 'tabadmin3',
    loadChildren: () => import('../tabadmin3/tabadmin3.module').then(m => m.Tabadmin3PageModule)
  },
  {
    // path: '/admin/tabadmin2',
    path: 'tabadmin4',
    loadChildren: () => import('../tabadmin4/tabadmin4.module').then(m => m.Tabadmin4PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
