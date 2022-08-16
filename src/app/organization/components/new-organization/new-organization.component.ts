import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Organization, OrganizationRequest } from '../../models/organization';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-new-organization',
  templateUrl: './new-organization.component.html',
  styleUrls: ['./new-organization.component.scss']
})
export class NewOrganizationComponent implements OnInit {

  base_url = '';
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

  orgForm = new FormGroup({
    path: new FormControl(''),
    name: new FormControl(''),
    visibility: new FormControl(''),
    description: new FormControl('')
  });  

  constructor(
    public router: Router,
    private service: OrganizationService
  ) {
    this.base_url = window.location.origin + '/';
  }

  ngOnInit(): void {
  }

  save() {
    const org: OrganizationRequest = {
      path: this.orgForm.value.path,
      name: this.orgForm.value.name,
      visibility: this.orgForm.value.visibility,
      description: this.orgForm.value.description
    };
    this.service.createOrg(org)
      .subscribe(res => {
        this.router.navigateByUrl(`orgs/${res.path}`);
      });
  }

}
