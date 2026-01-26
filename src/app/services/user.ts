import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ModuleValidation } from '../models/module-validation';

@Injectable({
  providedIn: 'root',
})
export class UserService { 

  apiUrl = "http://localhost:8083/users"

  private http = inject(HttpClient)

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getConnectUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`)
  }

  getEtudiants(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/etudiants`);
  }
  
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  getUserValidations(id: number): Observable<ModuleValidation[]> {
    return this.http.get<ModuleValidation[]>(`${this.apiUrl}/${id}/validations`)
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/create`, user)
  }

  assignFiliere(userId: number, filiereId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/filiere/${filiereId}`, {});
  }
  
}
