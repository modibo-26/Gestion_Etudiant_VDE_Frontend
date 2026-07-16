import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { User } from '../../../models/user';
import { ValidationBoard } from "../../validation-board/validation-board";
import { UserService } from '../../../services/user';
import { Observable } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Filiere } from '../../../models/filiere';
import { FiliereService } from '../../../services/filiere';


@Component({
  selector: 'app-dashboard-etudiant',
  imports: [
    ValidationBoard,
    AsyncPipe,
    DecimalPipe
    ],
  templateUrl: './dashboard-etudiant.html',
  styleUrl: './dashboard-etudiant.scss',
})
export class DashboardEtudiant implements OnInit {

  private auth = inject (Auth)

  private filiereService = inject(FiliereService)
  private service = inject(UserService)

  user$!: Observable<User>
  userFiliere$ !:Observable<Filiere>
  ngOnInit(): void {
    // const token = this.auth.getToken()
    // const payload = JSON.parse(atob(token!.split('.')[1]));
    // console.log(payload)
    // this.user = payload.user
    this.user$ = this.getConnect();
    this.user$.subscribe(user => {
      console.log(user);
    });
    this.user$.subscribe((user)=>{
      this.userFiliere$=this.filiereService.getFiliereById(user.filiereId);
    })
    
  }

  getConnect() {
    return this.service.getConnectUser();
  }

}
