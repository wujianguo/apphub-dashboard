import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { ApplicationService } from '../../services/application.service';
import { Pagination } from '../../models/pagination';
import { Application, Package } from '../../models/application';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  providers: [DownloadService]
})
export class DownloadComponent implements OnInit {
  app$?: Observable<Application>;
  packages$?: Observable<Pagination<Package>>;
  page$ = new BehaviorSubject<number>(1);
  page = 1;
  pageSize = 10;

  active = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: ApplicationService,
    private download: DownloadService,
  ) { }

  ngOnInit(): void {
    this.download.osDetect$.subscribe(os => {
      this.active = os;
    });
    
    this.packages$ = combineLatest([this.route.paramMap, this.page$]).pipe(
      distinctUntilChanged((pre, current) => pre[1]===current[1]),
      switchMap(params => {
        const slug = params[0].get('slug') ?? '';
        const page = params[1];
        return this.service.getPackagesBySlug(slug, page, this.pageSize, this.active);
      }));
    this.app$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug') ?? '';
        return this.service.getAppBySlug(slug);
    }));
  }

  refreshItems() {
    this.page$.next(this.page);
  }

  clickRow(item: Package) {
    this.router.navigate([`${item.package_id}`], { relativeTo: this.route });
  }

  clickTab() {
    this.page = 1;
    this.page$.next(this.page);
  }

}
