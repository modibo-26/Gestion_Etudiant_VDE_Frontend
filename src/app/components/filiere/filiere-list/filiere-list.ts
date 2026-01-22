import { Component, inject, OnInit } from '@angular/core';
import { FiliereService } from '../../../services/filiere';
import { Observable } from 'rxjs';
import { Filiere } from '../../../models/filiere';
import { AsyncPipe } from '@angular/common';
import { FiliereComponent } from '../filiere/filiere';

@Component({
  selector: 'app-filiere-list',
  imports: [AsyncPipe, FiliereComponent],
  templateUrl: './filiere-list.html',
  styleUrl: './filiere-list.scss',
})
export class FiliereList implements OnInit {

  private service = inject(FiliereService)

  filiere$!: Observable<Filiere[]>

  ngOnInit(): void {
    this.filiere$ = this.service.getFilieres();
  }

}
