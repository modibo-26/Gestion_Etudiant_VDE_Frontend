import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, RefreshCw, SquarePenIcon, Trash2, Users, Filter } from 'lucide-angular';
import { FiliereService } from '../../../services/filiere';
import { UserCompenent } from '../user/user';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCompenent,
    AsyncPipe,
    FormsModule,
    LucideAngularModule,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  private userService = inject(UserService);
  private filiereService = inject(FiliereService);
  private service = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  @Input() filiereId?: number;
  @Input() editable = false
  users$!: Observable<User[]>;
  user$!: Observable<User>;
  Ets$!: Observable<User[]>;
  filteredUsers$!: Observable<User[]>;
  filteredEts$!: Observable<User[]>;

  //passwordReset
  showModal = false;
  generatedPassword = '';
  generatedEmail = '';


  // Filtres
  searchTerm = '';
  selectedRole = '';

  // Icônes
  usersIcon = Users;
  editIcon = SquarePenIcon;
  deleteIcon = Trash2;
  resetPassIcon = RefreshCw;


  ngOnInit(): void {

    this.loadUsers();
  }

  private loadUsers() {

    const role = this.service.getRole()

    const request = this.filiereId
      ? this.filiereService.getUsers(this.filiereId)
      : this.userService.getAllUsers();
    this.filteredEts$=request;
    this.users$ = request.pipe(
      map(users => users.sort((a, b) =>
        new Date(b.dateEntree ?? 0).getTime() - new Date(a.dateEntree ?? 0).getTime()
      ))
    );
    if (role === "ADMIN") {
     
      this.filteredUsers$ = this.users$;

       if(this.filiereId)
        this.filteredUsers$.pipe(
      map(users =>  users.filter(u =>  u.role === 'Etudiant' && u.filiereId === this.filiereId
      )));

    } else {
      
      this.Ets$ = this.userService.getEtudiants();
     this.userService.getConnectUser().subscribe(user => {
        if(user.superFiliereId)
          this.Ets$=this.userService.getEtudiantsBySuperFiliere(user.superFiliereId);
        
          this.filteredEts$ = this.Ets$;
      });
      
  }
  }

  private applyFilters() {
    this.filteredUsers$ = this.users$.pipe(
      map(users => users.filter(user => {
        const matchesSearch = !this.searchTerm ||
          this.normalize(user.nom).includes(this.normalize(this.searchTerm)) ||
          this.normalize(user.prenom).includes(this.normalize(this.searchTerm));

        const matchesRole = !this.selectedRole || user.role === this.selectedRole;

        return matchesSearch && matchesRole;
      }))
    );
  }

  search() {
    return this.filteredEts$ = this.Ets$.pipe(
      map(users => users.filter(u =>
        this.normalize(u.nom).includes(this.searchTerm.toLocaleLowerCase()) ||
        this.normalize(u.prenom).includes(this.searchTerm.toLocaleLowerCase()) &&
        u.role === 'Etudiant'
      ))
    )
  }

  onSearchChange() {
    this.applyFilters();
  }

  onRoleChange() {
    this.applyFilters();
  }

  normalize(str: string): string {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  // Actions
  editUser(user: User) {
    console.log('Modifier:', user);
              this.loadUsers();
              this.cdr.detectChanges();

  }

  deleteUser(user: User) {
    if (confirm(`Supprimer ${user.prenom} ${user.nom} ?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => this.loadUsers(),
        error: err => console.error(err)
      });
    }
    this.cdr.detectChanges();
  }

  resetPassword(user: User) {
    if (confirm(`Régénérer le mot de passe de ${user.prenom} ${user.nom} ?`)) {
      this.userService.resetPassword(user.id!).subscribe({
        next: (newPass) => {
          this.generatedEmail = newPass.email!;
          this.generatedPassword = newPass.password!;
          this.showModal = true;
          
          this.ngOnInit();
        },
        error: err => console.error(err)
      });
    }
    this.cdr.detectChanges();
  }

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }


}