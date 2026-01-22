import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleValidation } from '../models/module-validation';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  apiUrl = "http://localhost:8083/module_validation"

  private http = inject(HttpClient)

  updateStatut(id: number, statut: string): Observable<ModuleValidation> {
    return this.http.put<ModuleValidation>(`${this.apiUrl}/${id}/statut/${statut}`, {})
  }

  getByStatut(statut: string): Observable<ModuleValidation[]> {
    return this.http.get<ModuleValidation[]>(`${this.apiUrl}/statut/${statut}`)
  }
  
}
