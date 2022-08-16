import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDetailComponent } from './download-detail.component';

describe('DownloadDetailComponent', () => {
  let component: DownloadDetailComponent;
  let fixture: ComponentFixture<DownloadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
