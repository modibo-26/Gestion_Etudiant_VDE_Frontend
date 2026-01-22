import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filiere } from '../models/filiere';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FiliereService {
  apiUrl = "http://localhost:8083/filieres"

  private http = inject(HttpClient)

  getFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.apiUrl)
  }

  getFiliereById(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.apiUrl}/${id}`)
  }

  getUsers(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${id}/users`)
  }


}
