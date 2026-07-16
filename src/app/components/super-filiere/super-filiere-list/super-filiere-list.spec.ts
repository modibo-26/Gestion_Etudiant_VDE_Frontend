import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperFiliereList } from './super-filiere-list';

describe('SuperFiliereList', () => {
  let component: SuperFiliereList;
  let fixture: ComponentFixture<SuperFiliereList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperFiliereList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperFiliereList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
