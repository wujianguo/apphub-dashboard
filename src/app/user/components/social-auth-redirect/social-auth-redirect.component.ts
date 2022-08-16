import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-social-auth-redirect',
  templateUrl: './social-auth-redirect.component.html',
  styleUrls: ['./social-auth-redirect.component.scss']
})
export class SocialAuthRedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const social = this.route.snapshot.paramMap.get('social') ?? '';
    let key = 'code';
    if (social==='dingtalk') {
      key = 'authCode'      
    }
    let code = this.route.snapshot.queryParamMap.get(key) ?? '';
    this.userService.social_authenticate(social, code)
      .subscribe(user => {
        if (user.new_user) {
          this.router.navigateByUrl('user/auth/complete');
        } else {
          this.router.navigateByUrl('');
        }
      });
  }

}
