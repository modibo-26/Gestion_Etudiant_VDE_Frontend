import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../models/module';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  apiUrl = "http://localhost:8083/modules"

  private http = inject(HttpClient)

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl)
  }

  getModuleById(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/${id}`)
  }

  addModule(module: Module) {
    return this.http.post<Module>(`${this.apiUrl}`, module)
  }

  updateModule(module: Module) {
    return this.http.put<Module>(`${this.apiUrl}`, module)
  }
  

}
