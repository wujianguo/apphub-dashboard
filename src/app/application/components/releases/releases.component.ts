import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Observable, switchMap } from 'rxjs';

import { Application, get_namespace_url, Release } from '../../models/application';
import { Pagination } from '../../models/pagination';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {

  app$?: Observable<Application | undefined>;
  releases$?: Observable<Pagination<Release>>;
  page$ = new BehaviorSubject<number>(1);
  page = 1;
  pageSize = 10;

  active = '';

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private service: ApplicationService
  ) { }

  ngOnInit(): void {
    this.app$ = this.service.onAppChanged();
    this.app$.subscribe(app => {
      this.active = app!.enable_os[0];
    });
    this.releases$ = combineLatest([this.app$, this.page$]).pipe(
      distinctUntilChanged((pre, current) => pre[1]===current[1]),
      switchMap(params => {
        const app = params[0]!;
        const namespace = get_namespace_url(app.namespace);
        const page = params[1]
        return this.service.getReleases(namespace, app.path, page, this.pageSize, this.active);
      }));
  }

  clickRow(item: Release) {
    // this.router.navigate([`${item.package_id}`], { relativeTo: this.route });
  }

  clickTab() {
    this.page = 1;
    this.page$.next(this.page);
  }

  refreshItems() {
    this.page$.next(this.page);
  }

  shareClick() {
    
  }

}
