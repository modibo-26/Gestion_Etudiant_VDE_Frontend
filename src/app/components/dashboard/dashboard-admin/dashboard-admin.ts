import { Component, inject, OnInit } from '@angular/core';
import { UserForm } from "../../user/user-form/user-form";
import { ModuleList } from "../../module/module-list/module-list";
import { FiliereList } from "../../filiere/filiere-list/filiere-list";
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../models/user';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    UserForm,
    ModuleList,
    FiliereList,
    LucideAngularModule,
  ],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin implements OnInit {

  user!: User

  private auth = inject(Auth)

  activeTab = "filiere-module"

  ngOnInit(): void {
    const token = this.auth.getToken()
    const payload = JSON.parse(atob(token!.split('.')[1]));
    console.log(payload)
    this.user = payload.user
  }

  changeTab(tab: string) {
    this.activeTab = tab
  }

}
