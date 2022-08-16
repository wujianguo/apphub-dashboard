import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Application, get_namespace_url } from '../../models/application';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  @Input() namespace = '';

  apps$?: Observable<Application[]>;

  constructor(
    public router: Router,
    private service: ApplicationService,
  ) { }

  ngOnInit(): void {
    console.log(this.namespace);
    if (this.namespace) {
      this.apps$ = this.service.getApps(this.namespace);
    } else {
      this.apps$ = this.service.getVisibleApps();
    }
  }

  clickRow(app: Application) {
    this.router.navigateByUrl(`${get_namespace_url(app.namespace)}/apps/${app.path}`)
  }

}
