import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user';
import { Observable } from 'rxjs';
import { UserDetail } from "../../user/user-detail/user-detail";
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ValidationBoard } from "../../validation-board/validation-board";


@Component({
  selector: 'app-dashboard-etudiant',
  imports: [
    AsyncPipe,
    ValidationBoard,
    ],
  templateUrl: './dashboard-etudiant.html',
  styleUrl: './dashboard-etudiant.scss',
})
export class DashboardEtudiant implements OnInit {

  private service = inject(UserService)

  user$!: Observable<User>
  
  ngOnInit(): void {
    this.getConectuser()
  }

  getConectuser(){
    this.user$ = this.service.getConnectUser();
  }
}
