import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-verify-email',
  templateUrl: './register-verify-email.component.html',
  styleUrls: ['./register-verify-email.component.scss']
})
export class RegisterVerifyEmailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code') ?? '';
    this.userService.register_verify_email(code)
      .subscribe(res => {
        this.router.navigateByUrl('');
      });
  }

}
