import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/tabs/admin.module').then( m => m.AdminPageModule)
  },
  
  {
    path: 'tabadmin1',
    loadChildren: () => import('./admin/tabadmin1/tabadmin1.module').then( m => m.Tabadmin1PageModule)
  },
  {
    path: 'tabadmin2',
    loadChildren: () => import('./admin/tabadmin2/tabadmin2.module').then( m => m.Tabadmin2PageModule)
  },
  {
    path: 'edit-place',
    loadChildren: () => import('./admin/edit-place/edit-place.module').then( m => m.EditPlacePageModule)
  },
  {
    path: 'inspect',
    loadChildren: () => import('./pages/inspect/inspect.module').then( m => m.InspectPageModule)
  },

  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'addlocation',
    loadChildren: () => import('./pages/addlocation/addlocation.module').then( m => m.AddlocationPageModule)
  },
  {
    path: 'create-comentario',
    loadChildren: () => import('./pages/create-comentario/create-comentario.module').then( m => m.CreateComentarioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
