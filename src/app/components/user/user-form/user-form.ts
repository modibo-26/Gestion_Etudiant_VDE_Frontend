import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user';
import { LucideAngularModule, UserPlus, Users } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SuperFiliere } from '../../../models/super-filiere';
import { SuperFiliereService } from '../../../services/super-filiere';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {

  // Icônes
  userPlusIcon = UserPlus;
  utilisateurs = Users;
  

  // Données
  superfilieres$!:Observable<SuperFiliere[]>;
  searchTerm = '';
  selectedRole = '';

  private userService = inject(UserService);
  private superFiliereService = inject(SuperFiliereService);
  private builder = inject(FormBuilder);

  showModal = false;
  generatedPassword = '';
  generatedEmail = '';

  userForm = this.builder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    superFiliereId:[''],
    role: ['ETUDIANT']
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.superfilieres$ = this.superFiliereService.getSuperFilieres();
  }

  // ==================== ACTIONS ====================
  onSubmitForm() {
    const user: User = {
      nom: this.userForm.value.nom!,
      prenom: this.userForm.value.prenom!,
      superFiliereId: this.userForm.value.superFiliereId,
      role: this.userForm.value.role!
    } as User;

    console.log(user);

    this.userService.createUser(user).subscribe({
      next: (createdUser) => {
        this.generatedEmail = createdUser.email!;
        this.generatedPassword = createdUser.password!;
        this.openModal();
        this.loadUsers();
        this.userForm.reset({ role: 'ETUDIANT' });
      },
      error: (err) => console.error(err)
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}