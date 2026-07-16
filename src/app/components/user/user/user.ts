import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { RefreshCcw, SquarePen, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserCompenent {
  @Input() user!: User
  @Output() onEdit = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<User>();
  @Output() onResetPassword = new EventEmitter<User>();

  @Input() editIcon = SquarePen;
  @Input() deleteIcon = Trash2;
  @Input() resetPassIcon = RefreshCcw;
  private router = inject(Router)

  onViewUser() {
    this.router.navigateByUrl(`/users/${this.user.id}`);
  }
}
