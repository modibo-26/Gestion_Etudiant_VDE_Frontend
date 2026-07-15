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
import { UserList } from "../../user/user-list/user-list";

@Component({
  selector: 'app-filiere-detail',
  imports: [
    AsyncPipe,
    ModuleComponent,
    UserList
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
  allModules$!: Observable<Module[]>;

  ngOnInit(): void {
    this.users$ = this.getUsers();

    this.modules$ = this.service.getModulesByFiliere(
      +this.route.snapshot.params['id']);

    this.allModules$ = this.moduleService.getModules();

    this.refreshData();

  }

  getFiliere() {
    const id = +this.route.snapshot.params['id'];
    return this.service.getFiliereById(id)
  }

  getUsers() {
    const id = +this.route.snapshot.params['id'];
    return this.service.getUsers(id);
  }

  getModules() {
    const id = +this.route.snapshot.params['id'];
  this.modules$ = this.service.getModulesByFiliere(id);
  }

  getModulesToAdd(filiereModules: Module[],    allModules: Module[]) {

    const ids = new Set(filiereModules.map(m => m.id));

    this.modulesToAdd = allModules.filter(
        m => !ids.has(m.id)
    );
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
    combineLatest([
      this.modules$,
      this.allModules$
    ]).subscribe(([filiereModules, allModules]) => {

      this.getModulesToAdd(
        filiereModules,
        allModules);

    });

    this.cdr.detectChanges()
  }
}