import { Component } from '@angular/core';
import { UserForm } from "../../user/user-form/user-form";

@Component({
  selector: 'app-dashboard-admin',
  imports: [UserForm],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin {

}
