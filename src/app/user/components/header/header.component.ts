import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

export interface HeaderNavLink {
  title: string;
  link: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  @Input() links: HeaderNavLink[] = [];

  private destroy$: Subject<void> = new Subject<void>();
  user?: User

  constructor(public userService: UserService, protected router: Router) {
    this.userService.onUserUpdated()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
      });

    if (this.userService.isAuthenticated()) {
      this.userService.me()
        .pipe(takeUntil(this.destroy$))
        .subscribe(user => {
          this.user = user;
        });
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.userService.logout()
      .subscribe({
        error: (error) => {
          this.router.navigateByUrl('user/login');
        },
        complete: () => {
          this.router.navigateByUrl('user/login');
        }
      });
  }
}
