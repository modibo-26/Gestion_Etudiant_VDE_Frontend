import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FiliereService } from '../../../services/filiere';
import { map, Observable } from 'rxjs';
import { Filiere } from '../../../models/filiere';
import { AsyncPipe } from '@angular/common';
import { FiliereComponent } from '../filiere/filiere';
import { BookOpen, LucideAngularModule, Plus } from "lucide-angular";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuperFiliere } from '../../../models/super-filiere';
import { SuperFiliereService } from '../../../services/super-filiere';

@Component({
  selector: 'app-filiere-list',
  imports: [
    AsyncPipe,
    FiliereComponent, 
    LucideAngularModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './filiere-list.html',
  styleUrl: './filiere-list.scss',
})
export class FiliereList implements OnInit {
  
  readonly plusIcon = Plus; 

  bookOpenIcon = BookOpen;

  private cdr = inject(ChangeDetectorRef);

  private builder = inject(FormBuilder);

  private service = inject(FiliereService);

  private superFiliereService = inject(SuperFiliereService);

  filieres$!: Observable<Filiere[]>;
  
  newFiliere$!: Observable<Filiere>;

  superFilieres$!: Observable<SuperFiliere[]>;

  filteredFilieres$!: Observable<Filiere[]>;

  modal = false;

  searchItem = '';

  selectedFiliere: Filiere | null = null;

  @Input() editable = false;

  filiereForm = this.builder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
    superFiliereId: [ 1,Validators.required]
  });

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.filieres$ = this.service.getFilieres();
    this.filteredFilieres$ = this.filieres$
    this.superFilieres$=this.superFiliereService.getSuperFilieres();
  }

  onSubmitForm() {
   
    const filiere: Filiere = {
      id: this.selectedFiliere?.id,
      nom: this.filiereForm.value.nom!,
      description: this.filiereForm.value.description!,
      superFiliereId : this.filiereForm.value.superFiliereId
    } as unknown as Filiere;
    
    console.log("filiere :" + filiere);
    
    console.log(JSON.stringify(filiere));
    const request = filiere.id 
    ? this.service.updateFiliere(filiere) 
    : this.service.addFiliere(filiere);
    
    request.subscribe({
      next: (createdFiliere) => {
        console.log(createdFiliere)
        this.filieres$ = this.service.getFilieres();
        this.cdr.detectChanges()
        this.closeModal()
      },
      error: (err) => console.error(err)
    });
  }

  search(){
    return this.filteredFilieres$ = this.filieres$.pipe(
      map(users => users.filter(u => 
        this.normalize(u.nom).includes(this.searchItem.toLocaleLowerCase())
      ))
    )
  }

  normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  openModal(filiere?: Filiere) {
    this.selectedFiliere = filiere ?? null;
    if (filiere) {
      this.filiereForm.patchValue(filiere);
    }
      this.modal = true;
  }

  closeModal() {
    this.modal = false;
    this.selectedFiliere = null;
    this.filiereForm.reset()
  }
}
