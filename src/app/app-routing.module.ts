import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WatchmanGuard } from './guards/watchman.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'create-product',
    loadChildren: () => import('./create-product/create-product.module').then(m => m.CreateProductPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'product-management/:id',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'productmanagement',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'usermanagement',
    loadChildren: () => import('./usermanagement/usermanagement.module').then(m => m.UsermanagementPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserPageModule), canActivate: [WatchmanGuard],
  },
  {
    path: 'inicio',
    loadChildren: () => import('./init/inicio.module').then(m => m.InicioPageModule), canActivate: [WatchmanGuard]
  },
  {
    path: 'other-services',
    loadChildren: () => import('./other-services/other-services.module').then(m => m.OtherServicesPageModule), canActivate: [WatchmanGuard]
  },
  {
    path: 'detail-product/:id',
    loadChildren: () => import('./detail-product/detail-product.module').then(m => m.DetailProductPageModule), canActivate: [WatchmanGuard]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
