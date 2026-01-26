import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Filiere } from '../../../models/filiere';

@Component({
  selector: 'app-filiere',
  imports: [],
  templateUrl: './filiere.html',
  styleUrl: './filiere.scss',
})
export class FiliereComponent {

  @Input() filiere!: Filiere

  @Input() editable = false

  @Output() onEdit = new EventEmitter<Filiere>(); 
  
  private router = inject(Router)

  onViewFiliere() {
    this.router.navigateByUrl(`/filieres/${this.filiere.id}`);
  }

}
