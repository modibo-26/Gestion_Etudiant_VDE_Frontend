import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { ModuleService } from '../../../services/module';
import { Observable } from 'rxjs';
import { Module } from '../../../models/module';
import { AsyncPipe } from '@angular/common';
import { ModuleComponent } from "../module/module";
import { LucideAngularModule, Plus } from "lucide-angular"
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-module-list',
  imports: [
    AsyncPipe, 
    ModuleComponent, 
    LucideAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './module-list.html',
  styleUrl: './module-list.scss',
})
export class ModuleList implements OnInit {

  private builder = inject(FormBuilder)

  private cdr = inject(ChangeDetectorRef)

  readonly plusIcon = Plus

  modal = false

  selectedModule: Module | null = null;

  @Input() editable = false

  moduleForm = this.builder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
  });

  private service = inject(ModuleService)

  modules$!: Observable<Module[]>

  ngOnInit(): void {
    this.modules$ = this.service.getModules()
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
