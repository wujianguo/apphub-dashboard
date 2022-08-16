import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Application, ApplicationRequest, Namespace, NamespaceKind, Package, Release } from '../models/application';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private app$: BehaviorSubject<Application | undefined> = new BehaviorSubject<Application | undefined>(undefined);

  constructor(private http: HttpClient) {

  }

  createApp(namespace: Namespace, app: ApplicationRequest): Observable<Application> {
    let url = environment.external_api_url + `/user/apps`;
    if (namespace.kind === NamespaceKind.Organization) {
      url = environment.external_api_url + `/orgs/${namespace.path}/apps`
    }
    return this.http.post(url, app)
      .pipe(map(res => {
          return res as Application;
        }),
      );
  }

  getVisibleApps(): Observable<Application[]> {
    const url = environment.external_api_url + `/apps`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Application[];
        }),
      );
  }

  getApps(namespace: string): Observable<Application[]> {
    const url = environment.external_api_url + `/${namespace}/apps`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Application[];
        }),
      );
  }

  setApp(app?: Application) {
    this.app$.next(app);
  }

  onAppChanged(): Observable<Application | undefined> {
    return this.app$.pipe();
  }

  get(namespace: string, path: string): Observable<Application> {
    const url = environment.external_api_url + `/${namespace}/apps/${path}`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Application;
        }),
      );
  }

  getPackages(namespace: string, path: string, page: number, per_page: number, os?: string): Observable<Pagination<Package>> {
    let url = environment.external_api_url + `/${namespace}/apps/${path}/packages?page=${page}&per_page=${per_page}`;
    if (os) {
      url += `&os=${os}`
    }
    return this.http.get(url, { observe: 'response' })
      .pipe(map(res => {
        const packages = res.body as Package[];
        const count = parseInt(res.headers.get('x-total-count')??'');
        return {
          total_count: count,
          data: packages
        };
      }),
    );
  }

  getReleases(namespace: string, path: string, page: number, per_page: number, os?: string): Observable<Pagination<Release>> {
    let url = environment.external_api_url + `/${namespace}/apps/${path}/releases?page=${page}&per_page=${per_page}`;
    if (os) {
      url += `&os=${os}`
    }
    return this.http.get(url, { observe: 'response' })
      .pipe(map(res => {
        const packages = res.body as Release[];
        const count = parseInt(res.headers.get('x-total-count')??'');
        return {
          total_count: count,
          data: packages
        };
      }),
    );
  }

  getAppBySlug(slug: string): Observable<Application> {
    const url = environment.external_api_url + `/download/${slug}`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Application;
        }),
      );
  }

  getPackagesBySlug(slug: string, page: number, per_page: number, os?: string): Observable<Pagination<Package>> {
    let url = environment.external_api_url + `/download/${slug}/packages?page=${page}&per_page=${per_page}`;
    if (os) {
      url += `&os=${os}`
    }
    return this.http.get(url, { observe: 'response' })
      .pipe(map(res => {
        const packages = res.body as Package[];
        const count = parseInt(res.headers.get('x-total-count')??'');
        return {
          total_count: count,
          data: packages
        };
      }),
    );
  }

  getLatestPackage(slug: string, tryOS?: string): Observable<Package> {
    let url = environment.external_api_url + `/download/${slug}/packages/latest`;
    if (tryOS) {
      url += `?tryOS=${tryOS}`
    }
    return this.http.get(url)
      .pipe(map(res => {
          return res as Package;
        }),
      );    
  }

  getPackage(slug: string, package_id: number): Observable<Package> {
    const url = environment.external_api_url + `/download/${slug}/packages/${package_id}`;
    return this.http.get(url)
      .pipe(map(res => {
          return res as Package;
        }),
      );    
  }

}
