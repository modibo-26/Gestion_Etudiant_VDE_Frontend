import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserList } from '../../user/user-list/user-list';
import { FiliereList } from '../../filiere/filiere-list/filiere-list';
import { ValidationService } from '../../../services/validation';
import { Observable } from 'rxjs';
import { ModuleValidation } from '../../../models/module-validation';
import { AsyncPipe } from '@angular/common';
import { Auth } from '../../../services/auth';
import { User } from '../../../models/user';
import { Check, Clock, LucideAngularModule, X } from 'lucide-angular';
import { Filiere } from '../../../models/filiere';
import { FiliereService } from '../../../services/filiere';
import { UserService } from '../../../services/user';


@Component({
  selector: 'app-dashboard-formateur',
  imports: [
    UserList,
    FiliereList,
    AsyncPipe,
    LucideAngularModule,
  ],
  templateUrl: './dashboard-formateur.html',
  styleUrl: './dashboard-formateur.scss',
})
export class DashboardFormateur implements OnInit {

  clockIcon = Clock;
  checkIcon = Check;
  xIcon = X;

  private auth = inject(Auth)

  user$!: Observable<User>;

  userFiliere$!: Observable<Filiere>;

  private service = inject(UserService);
  private validationService = inject(ValidationService)

  private filiereService = inject(FiliereService);
  private cdr = inject(ChangeDetectorRef)

  validations$!: Observable<ModuleValidation[]>


  ngOnInit(): void {
    this.validations$ = this.validationService.getByStatut("EN_ATTENTE")
   this.user$ = this.getConnect();
    this.user$.subscribe((user )=> {
     // console.log(user);
    });
    
  }

  getConnect() {
    return this.service.getConnectUser();
  }

  reponse(id: number, statut: string) {
    this.validationService.updateStatut(id, statut).subscribe(() => {
      this.validations$ = this.validationService.getByStatut("EN_ATTENTE")
      this.cdr.detectChanges()
    });
  }
}
