import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private service = inject(Auth)

  private formBuilder = inject(FormBuilder)

  private router = inject(Router)


  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });

  onSubmitForm(): void {
    this.service.login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe({
        next: () => {
            // Rediriger selon le rôle
            const role = this.service.getRole();
            if (role) {
                this.router.navigate([`/${role.toLocaleLowerCase()}`]);
            }
        },
        error: (err) => {
            console.error('Login failed', err);
        }
      });
  }

}