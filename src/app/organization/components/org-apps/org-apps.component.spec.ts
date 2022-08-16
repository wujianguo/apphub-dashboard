import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAppsComponent } from './org-apps.component';

describe('OrgAppsComponent', () => {
  let component: OrgAppsComponent;
  let fixture: ComponentFixture<OrgAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
