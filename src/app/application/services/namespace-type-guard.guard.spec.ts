import { TestBed } from '@angular/core/testing';

import { NamespaceTypeGuardGuard } from './namespace-type-guard.guard';

describe('NamespaceTypeGuardGuard', () => {
  let guard: NamespaceTypeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NamespaceTypeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
