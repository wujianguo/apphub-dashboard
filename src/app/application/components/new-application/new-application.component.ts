import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../user/models/user';
import { UserService } from '../../../user/services/user.service';
import { Organization } from '../../../organization/models/organization';
import { ApplicationService } from '../../services/application.service';
import { OrganizationService } from '../../../organization/services/organization.service';
import { ApplicationRequest, get_namespace_url, Namespace, NamespaceKind } from '../../models/application';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})
export class NewApplicationComponent implements OnInit, OnDestroy {

  base_url = '';
  os_list = [
    'Android',
    'iOS',
    'Linux',
    'macOS',
    'tvOS',
    'Windows',
  ];

  visibility_list = [
    {
      name: 'Private',
      description: 'Organization or application access must be granted explicitly to each user.'
    }, {
      name: 'Internal',
      description: 'The organization or application can be viewed by any logged in user.'
    }, {
      name: 'Public',
      description: 'The organization or application can be viewed without any authentication.'
    }
  ];

  orgs: Organization[] = [];

  appForm = new FormGroup({
    slug: new FormControl(''),
    path: new FormControl(''),
    name: new FormControl(''),
    namespace: new FormControl(''),
    os: new FormArray([]),
    visibility: new FormControl(''),
    description: new FormControl('')
  });

  private destroy$: Subject<void> = new Subject<void>();
  user?: User

  constructor(
    public router: Router,
    public userService: UserService,
    private service: ApplicationService,
    private orgService: OrganizationService
  ) {
    this.base_url = window.location.origin + '/';
  }

  ngOnInit(): void {
    this.userService.onUserUpdated()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
      });

    this.orgService.getMyOrgs()
      .subscribe(res => {
        this.orgs = res;
      });
  }

  save() {
    const app: ApplicationRequest = {
      path: this.appForm.value.path,
      name: this.appForm.value.name,
      install_slug: this.appForm.value.slug,
      enable_os: this.appForm.value.os,
      visibility: this.appForm.value.visibility,
      description: this.appForm.value.description,
    };
    
    let namespace: Namespace = {
      kind: NamespaceKind.Organization,
      name: '',
      path: this.appForm.value.namespace
    };

    if (this.appForm.value.namespace === 'user') {
      namespace.kind = NamespaceKind.User;
      namespace.path = this.user?.username ?? '';
    }
    
    this.service.createApp(namespace, app)
      .subscribe(res => {
        this.router.navigateByUrl(`${get_namespace_url(res.namespace)}/apps/${res.path}`)
      });
  }

  onCheckboxChange(name: string, target: HTMLInputElement) {
    const os = this.appForm.controls['os'] as FormArray;
    if (target.checked) {
      os.push(new FormControl(name));
    } else {
      const index = os.controls.findIndex(x => x.value === name);
      os.removeAt(index);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
