import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { User } from '../../../models/user';
import { FiliereService } from '../../../services/filiere';
import { ActivatedRoute } from '@angular/router';
import { Filiere } from '../../../models/filiere';
import { AsyncPipe } from '@angular/common';
import { UserCompenent } from '../../user/user/user';
import { Auth } from '../../../services/auth';
import { ModuleService } from '../../../services/module';
import { ModuleComponent } from '../../module/module/module';
import { Module } from '../../../models/module';

@Component({
  selector: 'app-filiere-detail',
  imports: [
    AsyncPipe,
    UserCompenent,
    ModuleComponent,
],
  templateUrl: './filiere-detail.html',
  styleUrl: './filiere-detail.scss',
})
export class FiliereDetail implements OnInit {

  private service = inject(FiliereService)

  private moduleService = inject(ModuleService)

  private route = inject(ActivatedRoute)

  private auth = inject(Auth)

  private cdr = inject(ChangeDetectorRef)

  filiere$!: Observable<Filiere>
  users$!: Observable<User[]>
  isAdmin = this.auth.getRole() === 'ADMIN';
  modules$!: Observable<Module[]>;
  modulesToAdd: Module[] = [];

  ngOnInit(): void {
    this.users$ = this.getUsers()
    this.modules$ = this.moduleService.getModules();
    this.refreshData()
  }

  getFiliere(){
    const id = +this.route.snapshot.params['id'];
    return this.service.getFiliereById(id)
  }

  getUsers(){
    const id = +this.route.snapshot.params['id'];
    return this.service.getUsers(id);
  }

  getModules(){
    this.modules$ = this.moduleService.getModules();
  }

  getModulesToAdd(filiere: Filiere, modules: Module[]) {
    const filiereModuleIds = new Set(filiere.modules?.map(m => m.id));
    this.modulesToAdd = modules.filter(m => !filiereModuleIds.has(m.id));
  }

  addModule(filiereId: number, moduleId: number) {
    this.service.addModule(filiereId, moduleId).subscribe(() => {
      this.refreshData()
    });
  }

  removeModule(filiereId: number, moduleId: number) {
    this.service.removeModule(filiereId, moduleId).subscribe(() => {
      this.refreshData()
    });
  } 

  refreshData() {
    this.filiere$ = this.getFiliere()
    combineLatest([this.filiere$, this.modules$]).subscribe(([filiere, module ]) => {
      this.getModulesToAdd(filiere, module);
    })
    this.cdr.detectChanges()
  }
}