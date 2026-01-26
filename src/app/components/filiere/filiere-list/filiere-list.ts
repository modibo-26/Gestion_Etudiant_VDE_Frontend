import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { FiliereService } from '../../../services/filiere';
import { Observable } from 'rxjs';
import { Filiere } from '../../../models/filiere';
import { AsyncPipe } from '@angular/common';
import { FiliereComponent } from '../filiere/filiere';
import { LucideAngularModule, Plus } from "lucide-angular";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-filiere-list',
  imports: [
    AsyncPipe,
    FiliereComponent, 
    LucideAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './filiere-list.html',
  styleUrl: './filiere-list.scss',
})
export class FiliereList implements OnInit {
  
  readonly plusIcon = Plus 

  private cdr = inject(ChangeDetectorRef)

  private builder = inject(FormBuilder)

  private service = inject(FiliereService)

  filiere$!: Observable<Filiere[]>

  modal = false

  selectedFiliere: Filiere | null = null;

  @Input() editable = false

  filiereForm = this.builder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
  });


  ngOnInit(): void {
    this.filiere$ = this.service.getFilieres();
  }

  onSubmitForm() {
    const filiere: Filiere = {
      id: this.selectedFiliere?.id,
      nom: this.filiereForm.value.nom!,
      description: this.filiereForm.value.description!,
    } as Filiere;

    const request = filiere.id 
    ? this.service.updateFiliere(filiere) 
    : this.service.addFiliere(filiere);
    
    request.subscribe({
      next: (createdFiliere) => {
        console.log(createdFiliere)
        this.filiere$ = this.service.getFilieres();
        this.cdr.detectChanges()
        this.closeModal()
      },
      error: (err) => console.error(err)
    });
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
