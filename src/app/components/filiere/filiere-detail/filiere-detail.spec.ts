import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereDetail } from './filiere-detail';

describe('FiliereDetail', () => {
  let component: FiliereDetail;
  let fixture: ComponentFixture<FiliereDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiliereDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiliereDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
