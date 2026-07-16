import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user';
import { ModuleValidation } from '../../../models/module-validation';
import { AsyncPipe, DecimalPipe, JsonPipe } from '@angular/common';
import { FiliereService } from '../../../services/filiere';
import { Filiere } from '../../../models/filiere';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationBoard } from "../../validation-board/validation-board";
import { SuperFiliereService } from '../../../services/super-filiere';

@Component({
  selector: 'app-user-detail',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    ValidationBoard,
    DecimalPipe,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {

  user$!: Observable<User>;

  selectedFiliereId!: number;

  userFiliereId!: number;

  userFiliere$!: Observable<Filiere>;

  filieres$!: Observable<Filiere[]>;

  private route = inject(ActivatedRoute);

  private service = inject(UserService);

  private filiereService = inject(FiliereService);

  private superFiliereService = inject(SuperFiliereService);

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.getUser();

  }

  getUser() {
    const userId = +this.route.snapshot.params['id']
    this.user$ = this.service.getUserById(userId);
    this.user$.subscribe((user) => {
      console.log(user.superFiliereId);
      if (user.filiereId != null)
        this.userFiliere$ = this.filiereService.getFiliereById(user.filiereId);
      else if (user.superFiliereId) {
        this.filieres$ = this.superFiliereService.getFilieres(user.superFiliereId);
        this.filieres$.subscribe(filieres => {
          console.log(filieres);
        });
      }
    });



  }

  onAssignFiliere(userId: number, filiereId: number) {
    this.service.assignFiliere(userId, filiereId).subscribe(() => {
      location.reload()
    });
  }

  refreshUser() {
    this.getUser()
    console.log("refreshed")
    this.cdr.detectChanges()
  }
}
