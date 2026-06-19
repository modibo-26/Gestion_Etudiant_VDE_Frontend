import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFiliereForm } from './super-filiere-form';

describe('SuperFiliereForm', () => {
  let component: SuperFiliereForm;
  let fixture: ComponentFixture<SuperFiliereForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperFiliereForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperFiliereForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
