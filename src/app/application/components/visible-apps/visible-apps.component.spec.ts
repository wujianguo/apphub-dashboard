import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleAppsComponent } from './visible-apps.component';

describe('VisibleAppsComponent', () => {
  let component: VisibleAppsComponent;
  let fixture: ComponentFixture<VisibleAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibleAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibleAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
