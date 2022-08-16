import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OrganizationRoutingModule, routedComponents } from './organization-routing.module';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    UserModule,
    ApplicationModule,
    NgbModule,
  ],
  exports: [
    OrganizationsComponent
  ]
})
export class OrganizationModule { }
