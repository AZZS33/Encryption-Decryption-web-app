import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { EncryptComponent } from './encrypt/encrypt.component';
import { ProfileComponent } from './profile/profile.component';
import { DecryptComponent } from './decrypt/decrypt.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['User']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
  ,{
    path:"register",
    component:RegisterComponent
    
    },
    {
      path:"encrypt",
      component:EncryptComponent
      
      },{
      path:"profile",
      component:ProfileComponent
      
      }
      ,
      {
        path:"decrypt",
        component:DecryptComponent
        
        },
        {
          path:"forget",
          component:ForgetPasswordComponent
          
          }, {
            path: 'changepassword',
            component: ChangePasswordComponent,
          }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}