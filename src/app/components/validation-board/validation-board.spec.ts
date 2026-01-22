import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationBoard } from './validation-board';

describe('ValidationBoard', () => {
  let component: ValidationBoard;
  let fixture: ComponentFixture<ValidationBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
