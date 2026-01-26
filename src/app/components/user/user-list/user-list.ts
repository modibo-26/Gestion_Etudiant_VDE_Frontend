import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserCompenent } from "../user/user";

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, UserCompenent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  private service = inject(UserService)

  users$!: Observable<User[]>;

  ngOnInit(): void {
    this.users$ = this.getEtudiants().pipe(
      map(etudiant => etudiant.sort((a, b) => new Date(a.dateEntree ?? 0).getTime() - new Date(b.dateEntree?? 0).getTime()))
    );
  }
  

  getEtudiants() {
    return this.service.getEtudiants()
  }

}
