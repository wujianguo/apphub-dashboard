import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Organization, OrganizationRequest } from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private org$: BehaviorSubject<Organization | undefined> = new BehaviorSubject<Organization | undefined>(undefined);

  constructor(private http: HttpClient) {

  }

  setOrg(org?: Organization) {
    this.org$.next(org);
  }

  onOrgChanged(): Observable<Organization | undefined> {
    return this.org$.pipe();
  }

  getVisibleOrgs(): Observable<Organization[]> {
    const url = environment.external_api_url + `/orgs`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Organization[];
        }),
      );
  }

  getMyOrgs(): Observable<Organization[]> {
    const url = environment.external_api_url + `/user/orgs`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Organization[];
        }),
      );
  }


  createOrg(org: OrganizationRequest): Observable<Organization> {
    const url = environment.external_api_url + `/orgs`;
    return this.http.post(url, org)
      .pipe(map(res => {
          return res as Organization;
        }),
      );
  }
  
  get(path: string): Observable<Organization> {
    const url = environment.external_api_url + `/orgs/${path}`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Organization;
        }),
      );
  }

}
