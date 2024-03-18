import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./Modules/auth/auth.module').then(x=>x.AuthModule)},
  {path:'admin',loadChildren:()=>import('./Modules/admin/admin.module').then(x=>x.AdminModule), canActivate: [AuthGuard]},
  {path:'telecaller',loadChildren:()=>import('./Modules/telecaller/telecaller.module').then(x=>x.TelecallerModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
