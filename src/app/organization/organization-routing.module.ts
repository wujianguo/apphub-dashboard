import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './components/organizations/organizations.component';
import { NewOrganizationComponent } from './components/new-organization/new-organization.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrgAppsComponent } from './components/org-apps/org-apps.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VisibleOrgsComponent } from './components/visible-orgs/visible-orgs.component';

const routes: Routes = [
  {
    path: 'orgs/new',
    component: NewOrganizationComponent,
  },
  {
    path: 'orgs',
    component: VisibleOrgsComponent,
  },
  {
    path: 'orgs/:org',
    component: OrganizationComponent,
    children: [
      {
        path: 'apps',
        component: OrgAppsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }

export const routedComponents = [
  OrganizationsComponent,
  NewOrganizationComponent,
  OrganizationComponent,
  OrgAppsComponent,
  SettingsComponent,
  VisibleOrgsComponent,
]
