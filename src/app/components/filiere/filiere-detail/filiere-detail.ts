import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { FiliereService } from '../../../services/filiere';
import { ActivatedRoute } from '@angular/router';
import { Filiere } from '../../../models/filiere';
import { AsyncPipe } from '@angular/common';
import { UserCompenent } from '../../user/user/user';

@Component({
  selector: 'app-filiere-detail',
  imports: [
    AsyncPipe,
    UserCompenent
  ],
  templateUrl: './filiere-detail.html',
  styleUrl: './filiere-detail.scss',
})
export class FiliereDetail implements OnInit {

  private service = inject(FiliereService)

  private route = inject(ActivatedRoute)

  filiere$!: Observable<Filiere>
  users$!: Observable<User[]>

  ngOnInit(): void {
    this.users$ = this.getUsers()
    this.filiere$ = this.getFiliere()
  }

  getFiliere(){
    const id = +this.route.snapshot.params['id'];
    return this.service.getFiliereById(id)
  }

  getUsers(){
    const id = +this.route.snapshot.params['id'];
    return this.service.getUsers(id);
  }
}
