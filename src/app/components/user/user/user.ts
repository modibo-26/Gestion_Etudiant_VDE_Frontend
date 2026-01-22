import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserCompenent {
  @Input() user!: User

  private router = inject(Router)

  onViewUser() {
    this.router.navigateByUrl(`/users/${this.user.id}`);
  }
}
