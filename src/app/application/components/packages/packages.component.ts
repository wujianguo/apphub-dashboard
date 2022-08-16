import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Application, get_namespace_url, Package } from '../../models/application';
import { Pagination } from '../../models/pagination';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  uploadForm = new FormGroup({
    file: new FormControl(''),
    commit: new FormControl(''),
    description: new FormControl('')
  });  

  app$?: Observable<Application | undefined>;
  packages$?: Observable<Pagination<Package>>;
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
    this.packages$ = combineLatest([this.app$, this.page$]).pipe(
      distinctUntilChanged((pre, current) => pre[1]===current[1]),
      switchMap(params => {
        const app = params[0]!;
        const namespace = get_namespace_url(app.namespace);
        const page = params[1]
        return this.service.getPackages(namespace, app.path, page, this.pageSize, this.active);
      }));
  }

  clickRow(item: Package) {
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

  uploadClick(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
