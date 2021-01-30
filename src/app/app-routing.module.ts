import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGurad } from './auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { UserdetailComponent } from './user/userdetail/userdetail.component';

const routes: Routes = [
  {path:'',redirectTo:'/auth',pathMatch:'full' },
  {path:'auth',component:AuthComponent},
  {path:'signup',component:SignupComponent},
  {path:'users',component:UserComponent,canActivate:[AuthGurad]},
  {path:'users/:id',component:UserdetailComponent,canActivate:[AuthGurad]},
  //  { path:'products', loadChildren: './product/product.module#ProductModule'} 
  { path:'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) } 
   
];

@NgModule({
  declarations:[
    AuthComponent,
    SignupComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [
    RouterModule  
  ],
  providers:[]
})
export class AppRoutingModule { }
