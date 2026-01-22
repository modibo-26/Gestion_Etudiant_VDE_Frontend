import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserList } from '../../user/user-list/user-list';
import { FiliereList } from '../../filiere/filiere-list/filiere-list';
import { FiliereService } from '../../../services/filiere';
import { UserService } from '../../../services/user';
import { ValidationService } from '../../../services/validation';
import { Observable } from 'rxjs';
import { ModuleValidation } from '../../../models/module-validation';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard-formateur',
  imports: [
    UserList,
    FiliereList,
    AsyncPipe
],
  templateUrl: './dashboard-formateur.html',
  styleUrl: './dashboard-formateur.scss',
})
export class DashboardFormateur implements OnInit {

  private validationService = inject(ValidationService)

  private cdr = inject(ChangeDetectorRef)

  validations$!: Observable<ModuleValidation[]>


  ngOnInit(): void {
    this.validations$ = this.validationService.getByStatut("EN_ATTENTE")
  }

 reponse(id: number, statut: string) {
  this.validationService.updateStatut(id, statut).subscribe(() => {
    this.validations$ = this.validationService.getByStatut("EN_ATTENTE")
    this.cdr.detectChanges();
    ;
  });
}

}
