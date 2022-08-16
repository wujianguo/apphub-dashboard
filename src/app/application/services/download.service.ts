import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DownloadService {

  // Observable string sources
  private osDetectSource = new Subject<string>();

  // Observable string streams
  osDetect$ = this.osDetectSource.asObservable();

  // Service message commands
  detectOs(os: string) {
    this.osDetectSource.next(os);
  }

}