import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModuleValidation } from '../../models/module-validation';
import { UserService } from '../../services/user';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ValidationService } from '../../services/validation';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-validation-board',
  imports: [
    AsyncPipe,
    DragDropModule,
  ],
  templateUrl: './validation-board.html',
  styleUrl: './validation-board.scss',
})
export class ValidationBoard implements OnInit {
  validations$!: Observable<ModuleValidation[]>;
  @Input() userId!: number
  @Input() editable = false;

  @Output() statusChanged = new EventEmitter<void>();

  aFaire$!: Observable<ModuleValidation[]>;
  enCours$!: Observable<ModuleValidation[]>;
  enAttente$!: Observable<ModuleValidation[]>;
  termine$!: Observable<ModuleValidation[]>;

  private service = inject(ValidationService)

  private userService = inject(UserService);

  private cdr = inject(ChangeDetectorRef)

  private auth = inject(Auth)

  isFormateur = this.auth.getRole() === 'FORMATEUR'
  
  ngOnInit(): void {
    console.log(this.editable)
    this.validations$ =  this.getValidation()
    console.log(this.isFormateur)

    this.aFaire$ = this.getByStatut('A_FAIRE');
    this.enCours$ = this.getByStatut('EN_COURS');
    this.enAttente$ = this.getByStatut('EN_ATTENTE');
    this.termine$ = this.getByStatut('TERMINE');
  }

  getValidation() {
    return this.userService.getUserValidations(this.userId);
  }

  getByStatut(statut: string) {
    return this.validations$.pipe(
      map(v => v.filter(x => x.statut === statut))
    );
  }

  onDrop(event: CdkDragDrop<string>) {
    const validation = event.item.data as ModuleValidation;
    const newStatut = event.container.data;
    this.changeStatut(validation.id, newStatut)
  }

  changeStatut(id: number, statut: string) {
    return this.service.updateStatut(id, statut).subscribe(() =>{
      this.refresh()
    })
  }

  refresh() {
    this.validations$ =  this.getValidation()

    this.aFaire$ = this.getByStatut('A_FAIRE');
    this.enCours$ = this.getByStatut('EN_COURS');
    this.enAttente$ = this.getByStatut('EN_ATTENTE');
    this.termine$ = this.getByStatut('TERMINE');
    this.statusChanged.emit()
    this.cdr.detectChanges()
  }
}
