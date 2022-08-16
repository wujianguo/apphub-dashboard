import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterVerifyEmailComponent } from './components/register-verify-email/register-verify-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RequestResetPasswordComponent } from './components/request-reset-password/request-reset-password.component';
import { SocialAuthRedirectComponent } from './components/social-auth-redirect/social-auth-redirect.component';
import { SocialAuthCompleteComponent } from './components/social-auth-complete/social-auth-complete.component';
import { PersonComponent } from './components/person/person.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }, {
        path: 'profile',
        component: ProfileComponent
      }, {
        path: 'register/verify_email/:code',
        component: RegisterVerifyEmailComponent
      }, {
        path: 'password/request-reset',
        component: RequestResetPasswordComponent
      }, {
        path: 'password/reset',
        component: ResetPasswordComponent
      }, {
        path: 'auth/:social/redirect',
        component: SocialAuthRedirectComponent
      }, {
        path: 'auth/complete',
        component: SocialAuthCompleteComponent
      }, {
        path: '**',
        component: NotFoundComponent
      }
   ]
  }, {
    path: 'users',
    component: UserComponent,
    children: [
      {
        path: ':username',
        component: PersonComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


export const routedComponents = [
  UserComponent,
  LoginComponent,
  RegisterComponent,
  ProfileComponent,
  RegisterVerifyEmailComponent,
  RequestResetPasswordComponent,
  ResetPasswordComponent,
  SocialAuthRedirectComponent,
  SocialAuthCompleteComponent,
  PersonComponent,
  NotFoundComponent,
]
