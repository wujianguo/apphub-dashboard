import { Component, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss']
})
export class SwaggerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    SwaggerUI({
      domNode: document.getElementById('swagger-ui-item'),
      url: environment.external_api_url + '/docs/swagger.json',
      persistAuthorization: true
    });
  }

}
