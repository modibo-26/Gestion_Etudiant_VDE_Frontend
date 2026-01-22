import { Component, inject, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm{

  private builder = inject(FormBuilder)

  private service = inject(UserService)

  @Input() user?: User

  userForm = this.builder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    role: ['ETUDIANT']
  });


  onSubmitForm() {
    const user: User = {
      nom: this.userForm.value.nom!,
      prenom: this.userForm.value.prenom!,
      role: this.userForm.value.role!
    } as User;
    
    this.service.createUser(user).subscribe({
      next: (createdUser) => {
        console.log('Password généré:', createdUser.password);
        // Afficher le password à l'admin ou rediriger
      },
      error: (err) => console.error(err)
    });
  }

}
