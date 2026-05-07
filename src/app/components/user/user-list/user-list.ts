import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserCompenent } from "../user/user";
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Users } from 'lucide-angular';
import { FiliereService } from '../../../services/filiere';

@Component({
  selector: 'app-user-list',
  imports: [
    AsyncPipe, 
    UserCompenent,
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  private service = inject(UserService)

  private filiereService = inject(FiliereService)

  @Input() filiereId?: number;

  users$!: Observable<User[]>;

  filteredUsers$!: Observable<User[]>;

  searchItem = ''
  usersIcon = Users;

  ngOnInit(): void {
    const request = this.filiereId 
    ? this.filiereService.getUsers(this.filiereId)
    : this.service.getEtudiants();
    this.users$ = request.pipe(
      map(etudiant => etudiant.sort((a, b) => new Date(a.dateEntree ?? 0).getTime() - new Date(b.dateEntree?? 0).getTime()))
    );
    this.filteredUsers$ = this.users$
  }

  getEtudiants() {
    return this.service.getEtudiants()
  }


  search(){
    return this.filteredUsers$ = this.users$.pipe(
      map(users => users.filter(u => 
        this.normalize(u.nom).includes(this.searchItem.toLocaleLowerCase()) ||
        this.normalize(u.prenom).includes(this.searchItem.toLocaleLowerCase())
      ))
    )
  }

  normalize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

}
