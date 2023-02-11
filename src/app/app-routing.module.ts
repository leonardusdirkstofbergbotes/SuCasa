import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/public-facing/public-facing.module').then(m => m.PublicFacingModule),
},{
  path: 'test',
  loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule),
},{
  path: 'login',
  loadChildren: () => import('./modules/Auth/login/login.module').then(m => m.LoginModule),
},
{
  path: 'register',
  loadChildren: () => import('./modules/Auth/register/register.module').then(m => m.RegisterModule),
},{
  path: 'forgot-password',
  loadChildren: () => import('./modules/Auth/forgot/forgot.module').then(m => m.ForgotModule),
},{
  path: 'admin',
  loadChildren: () => import('./modules/Admin/admin.module').then(m => m.AdminModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
