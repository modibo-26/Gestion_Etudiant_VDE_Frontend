import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user';
import { LucideAngularModule, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm{

  userPlusIcon = UserPlus;

  private builder = inject(FormBuilder)

  private service = inject(UserService)

  private cdr = inject(ChangeDetectorRef)

  @Input() user?: User

  showModal = false

  generatedPassword = ''

  generatedEmail = ''

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
        console.log('Password généré:', createdUser.password)
        this.generatedPassword = createdUser.password!
        this.generatedEmail = createdUser.email!
        this.openModal()
        this.cdr.detectChanges()
      },
      error: (err) => console.error(err)
    });
  }

  openModal() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

}
