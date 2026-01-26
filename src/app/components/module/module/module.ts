import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Module } from '../../../models/module';

@Component({
  selector: 'app-module',
  imports: [],
  templateUrl: './module.html',
  styleUrl: './module.scss',
})
export class ModuleComponent {

  @Input() module!: Module
  
  @Input() editable = false

  @Input() deletable = false

  @Output() onEdit = new EventEmitter<Module>(); 

  @Output() onDelete = new EventEmitter<Module>();

}
