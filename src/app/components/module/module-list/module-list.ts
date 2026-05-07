import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ModuleService } from '../../../services/module';
import { map, Observable } from 'rxjs';
import { Module } from '../../../models/module';
import { AsyncPipe } from '@angular/common';
import { ModuleComponent } from "../module/module";
import { BookOpen, Layers, LucideAngularModule, Package, Plus } from "lucide-angular"
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-module-list',
  imports: [
    AsyncPipe, 
    ModuleComponent, 
    LucideAngularModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './module-list.html',
  styleUrl: './module-list.scss',
})
export class ModuleList implements OnInit {

  private builder = inject(FormBuilder)

  private cdr = inject(ChangeDetectorRef)

  readonly plusIcon = Plus

  packageIcon = Layers

  modal = false

  selectedModule: Module | null = null;

  @Input() editable = false

  moduleForm = this.builder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
  });

  private service = inject(ModuleService)

  modules$!: Observable<Module[]>

  filteredModules$!: Observable<Module[]>;

  searchItem = ''

  ngOnInit(): void {
    this.modules$ = this.service.getModules()
    this.filteredModules$ = this.modules$
  }

  onSubmitForm() {
    const module: Module = {
      id: this.selectedModule?.id,
      nom: this.moduleForm.value.nom!,
      description: this.moduleForm.value.description!,
    } as Module;
      
    const request = module.id 
    ? this.service.updateModule(module) 
    : this.service.addModule(module);

    request.subscribe({
      next: (createdModule) => {
        console.log(createdModule)
        this.modules$ = this.service.getModules();
        this.cdr.detectChanges()
        this.moduleForm.reset()
        this.closeModal()
      },
      error: (err) => console.error(err)
    });
  }

  search(){
    return this.filteredModules$ = this.modules$.pipe(
      map(modules => modules.filter(m => 
        this.normalize(m.nom).includes(this.searchItem.toLocaleLowerCase())
      ))
    )
  }

  normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  openModal(module?: Module) {
    this.selectedModule = module ?? null;
    if (module) {
      this.moduleForm.patchValue(module);
    }
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  

}
