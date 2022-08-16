import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, last, map } from 'rxjs';
import { AuthConfig, AuthSocialConfig } from '../../models/config';
import { LoginRequest } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  config$?: Observable<AuthConfig>;

  loginForm = new FormGroup({
    account: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false)
  });  

  constructor(private userService: UserService, protected router: Router) {
    if (userService.isAuthenticated()) {
      this.redirect()
    }
  }

  ngOnInit(): void {
    this.config$ = this.userService.getAuthConfig().pipe(map(res => {
      if (!res.email && res.social.length === 1) {
        this.clickSocialLogin(res.social[0]);
      }
      return res;
    }));
  }

  login() {
    let data: LoginRequest = {
      password: this.loginForm.value.password
    }
    if (this.loginForm.value.account.indexOf('@') === -1) {
      data.username = this.loginForm.value.account;
    } else {
      data.email = this.loginForm.value.account;
    }
    this.userService.authenticate(this.loginForm.value.rememberMe, data)
      .subscribe(user => {
        this.redirect();
      });
  }

  clickSocialLogin(social: AuthSocialConfig) {
    this.userService.getSocialLoginLink(social.name)
      .subscribe(link => {
        window.location.href = link.url;
      });
  }

  private redirect() {
    this.router.navigateByUrl('user/profile');

  }

}
