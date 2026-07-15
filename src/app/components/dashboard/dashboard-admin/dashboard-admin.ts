import { Component, inject, OnInit } from '@angular/core';
import { UserForm } from "../../user/user-form/user-form";
import { ModuleList } from "../../module/module-list/module-list";
import { FiliereList } from "../../filiere/filiere-list/filiere-list";
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../models/user';
import { Auth } from '../../../services/auth';
import { UserList } from '../../user/user-list/user-list';
import { UserService } from '../../../services/user';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    UserForm,
    AsyncPipe,
    UserList,
    ModuleList,
    FiliereList,
    LucideAngularModule,
  ],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin implements OnInit {

  user$!: Observable<User>;

  private auth = inject(Auth);

  private userService = inject(UserService);

  activeTab = "filiere-module"

  ngOnInit(): void {
    const token = this.auth.getToken()
    const payload = JSON.parse(atob(token!.split('.')[1]));
    console.log(payload);
    this.user$=this.userService.getConnectUser();
    
  }

  changeTab(tab: string) {
    this.activeTab = tab
  }

}
