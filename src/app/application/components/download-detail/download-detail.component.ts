import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Package } from '../../models/application';
import { ApplicationService } from '../../services/application.service';
import { DownloadService } from '../../services/download.service';

@Component({
  selector: 'app-download-detail',
  templateUrl: './download-detail.component.html',
  styleUrls: ['./download-detail.component.scss']
})
export class DownloadDetailComponent implements OnInit {

  package$?: Observable<Package>;
  package?: Package;
  origin: string;
  latest = true;
  
  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    public router: Router,
    private service: ApplicationService,
    private download: DownloadService,
    private deviceService: DeviceDetectorService
  ) {
    this.origin = window.location.origin;
  }

  ngOnInit(): void {
    let os = this.deviceService.os;
    if (os == 'Android') {
      os = 'Android';
    } else if (os == 'iOS') {
      os = 'iOS';
    } else if (os == 'Windows') {
      os = 'Windows';
    } else if (os == 'Mac') {
      os = 'macOS';
    } else if (os == 'Unix') {
      os = 'Linux'
    } else {
      os = '';
    }

    const parent = this.route.parent;
    if (!parent) {
      return;
    }
    const combined = combineLatest([parent.paramMap, this.route.paramMap]);
    this.package$ = combined.pipe(
      switchMap(params => {
        const slug = params[0].get('slug') ?? ''
        const package_id = parseInt(params[1].get('package_id') ?? '0')
        if (package_id) {
          this.latest = false;
          return this.service.getPackage(slug, package_id);          
        } else {
          this.latest = true;
          return this.service.getLatestPackage(slug, os);
        }
    }));
    this.package$.subscribe(pkg => {
      this.package = pkg;
      this.download.detectOs(pkg.os);
    });
  }

  safeCinema(cinemaLoc: string) {
    return this.sanitizer.bypassSecurityTrustUrl(cinemaLoc);
  }

}
