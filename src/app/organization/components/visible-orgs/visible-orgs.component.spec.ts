import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleOrgsComponent } from './visible-orgs.component';

describe('VisibleOrgsComponent', () => {
  let component: VisibleOrgsComponent;
  let fixture: ComponentFixture<VisibleOrgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibleOrgsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibleOrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
