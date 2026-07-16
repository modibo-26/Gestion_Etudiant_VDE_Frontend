import { TestBed } from '@angular/core/testing';

import { SuperFiliere } from './super-filiere';

describe('SuperFiliere', () => {
  let service: SuperFiliere;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperFiliere);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
