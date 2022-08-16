import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule, routedComponents } from './home-routing.module';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';
import { OrganizationModule } from '../organization/organization.module';

@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UserModule,
    ApplicationModule,
    OrganizationModule,
    NgbModule,
  ]
})
export class HomeModule { }
