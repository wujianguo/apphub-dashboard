import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';

import { ApplicationRoutingModule, routedComponents } from './application-routing.module';
import { ApplicationsComponent } from './components/applications/applications.component';
import { UserModule } from '../user/user.module';
import { FilesizePipe } from './pipes/filesize.pipe';


@NgModule({
  declarations: [
    ...routedComponents,
    FilesizePipe,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ReactiveFormsModule,
    UserModule,
    NgbModule,
    QRCodeModule
  ],
  exports: [
    ApplicationsComponent
  ]
})
export class ApplicationModule { }
