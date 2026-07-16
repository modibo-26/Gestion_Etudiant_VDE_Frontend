import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { SuperFiliere } from '../models/super-filiere';
import { Filiere } from '../models/filiere';

@Injectable({
  providedIn: 'root',
})
export class SuperFiliereService {
  
  apiUrl = "http://localhost:8083/super_filiere/"

  private http = inject(HttpClient)

  getSuperFilieres(): Observable<SuperFiliere[]> {
    return this.http.get<SuperFiliere[]>(this.apiUrl)
  }

  getFiliereById(id: number): Observable<SuperFiliere> {
     this.http.get<SuperFiliere>(`${this.apiUrl}${id}`).subscribe(data =>{
      console.log(data);
    });
    return this.http.get<SuperFiliere>(`${this.apiUrl}${id}`);
  }

  getEtudiantsBySuperFiliere(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${id}/users`);
  }

  getFilieres(id: number): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${this.apiUrl}${id}/filieres`);
  }

}
