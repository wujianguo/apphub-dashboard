import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Organization } from '../../models/organization';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  orgs$?: Observable<Organization[]>;

  constructor(
    public router: Router,
    private service: OrganizationService
  ) { }

  ngOnInit(): void {
    this.orgs$ = this.service.getVisibleOrgs();
  }

  clickRow(org: Organization) {
    this.router.navigateByUrl(`orgs/${org.path}`);
  }

}
