import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiliereComponent } from './filiere';


describe('Filiere', () => {
  let component: FiliereComponent;
  let fixture: ComponentFixture<FiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiliereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiliereComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
