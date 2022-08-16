import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User, LoginRequest, RegisterRequest } from '../models/user';
import { environment } from '../../../environments/environment';
import { AuthConfig, SocialLoginLink } from '../models/config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private key = 'auth_app_token';
  private user?: User;
  private token: string = '';
  private user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private token$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(protected http: HttpClient) {
    this.token = localStorage.getItem(this.key) ?? '';
    this.publishTokenChanged();
    this.publishAuthenticationChanged();
  }

  getAuthConfig(): Observable<AuthConfig> {
    const url = this.buildURL('/user/auth/config');
    return this.http.get(url)
      .pipe(map(res => {
          return res as AuthConfig;
        }),
      );
  }

  getSocialLoginLink(social: string): Observable<SocialLoginLink> {
    const url = this.buildURL(`/user/${social}/login`);
    return this.http.get(url)
      .pipe(map(res => {
          return res as SocialLoginLink;
        }),
      );
  }

  social_authenticate(social: string, code: string): Observable<User> {
    const url = this.buildURL(`/user/${social}/login`);
    return this.http.post(url, {code: code})
      .pipe(map(res => {
        this.user = res as User;
        this.token = this.user.token;
        this.saveToken(this.user.token);
        this.publishTokenChanged();
        this.publishAuthenticationChanged();
        this.publishUserUpdated();
        return this.user;
      }),
    );    
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return (this.user != undefined && this.user != null) || this.getToken() != '';
  }

  onTokenChanged(): Observable<string> {
    return this.token$.pipe();
  }

  onUserUpdated(): Observable<User | undefined> {
    return this.user$.pipe();
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.authenticated$.pipe();
  }

  authenticate(rememberMe: boolean, data: LoginRequest): Observable<User> {
    const url = this.buildURL('/user/login');
    return this.http.post(url, data)
      .pipe(map(res => {
        this.user = res as User;
        this.token = this.user.token;
        this.saveToken(this.user.token);
        this.publishTokenChanged();
        this.publishAuthenticationChanged();
        this.publishUserUpdated();
        return this.user;
      }),
    );
  }

  register(data: RegisterRequest): Observable<User> {
    const url = this.buildURL('/user/register');
    return this.http.post(url, data)
      .pipe(map(res => {
        this.user = res as User;
        this.token = this.user.token;
        this.saveToken(this.user.token);
        this.publishTokenChanged();
        this.publishAuthenticationChanged();
        this.publishUserUpdated();
        return this.user;
      }),
    );
  }

  register_verify_email(code: string): Observable<void> {
    const url = this.buildURL(`/user/register/verify_email`);
    return this.http.post(url, {key: code})
      .pipe(map(res => {

      }));
  }

  logout(): Observable<void> {
    const url = this.buildURL('/user/logout');
    return this.http.delete(url)
      .pipe(map(res => {
        this.removeToken();
        this.token = '';
        this.user = undefined;
        this.publishTokenChanged();
        this.publishAuthenticationChanged();
        this.publishUserUpdated();
      }),
      catchError(err => {
        this.removeToken();
        this.token = '';
        this.user = undefined;
        this.publishTokenChanged();
        this.publishAuthenticationChanged();
        this.publishUserUpdated();
        return throwError(() => err);
      }),
    );
  }

  me(): Observable<User> {
    const url = this.buildURL('/user');
    return this.http.get(url)
      .pipe(map(res => {
        this.user = res as User;
        this.publishUserUpdated();
        return this.user;
      }),
    );
  }

  private saveToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  private removeToken() {
    localStorage.removeItem(this.key);
  }

  private publishUserUpdated() {
    this.user$.next(this.user);
  }

  private publishTokenChanged() {
    this.token$.next(this.token);
  }

  private publishAuthenticationChanged() {
    this.authenticated$.next(this.token !== '');
  }

  private buildURL(path: string): string {
    return environment.external_api_url + path;
  }

}
