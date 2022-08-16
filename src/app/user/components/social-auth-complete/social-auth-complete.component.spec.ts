import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthCompleteComponent } from './social-auth-complete.component';

describe('SocialAuthCompleteComponent', () => {
  let component: SocialAuthCompleteComponent;
  let fixture: ComponentFixture<SocialAuthCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAuthCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
