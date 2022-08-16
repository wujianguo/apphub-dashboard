import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthRedirectComponent } from './social-auth-redirect.component';

describe('SocialAuthRedirectComponent', () => {
  let component: SocialAuthRedirectComponent;
  let fixture: ComponentFixture<SocialAuthRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialAuthRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAuthRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
