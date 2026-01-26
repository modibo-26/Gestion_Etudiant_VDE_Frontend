import { Routes } from '@angular/router';
import { UserDetail } from './components/user/user-detail/user-detail';
import { FiliereDetail } from './components/filiere/filiere-detail/filiere-detail';
import { authGuard } from './guards/auth-guard';
import { DashboardAdmin } from './components/dashboard/dashboard-admin/dashboard-admin';
import { DashboardEtudiant } from './components/dashboard/dashboard-etudiant/dashboard-etudiant';
import { DashboardFormateur } from './components/dashboard/dashboard-formateur/dashboard-formateur';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: 'formateur', component: DashboardFormateur, canActivate: [authGuard], data: { roles: ['FORMATEUR'] } },
  { path: 'admin', component: DashboardAdmin, canActivate: [authGuard], data: {roles: ['ADMIN']} },
  { path: 'etudiant', component: DashboardEtudiant, canActivate: [authGuard], data: {roles: ['ETUDIANT']} },
  { path: 'users/:id', component: UserDetail, canActivate: [authGuard], data: { roles: ['FORMATEUR'] } },
  { path: 'filieres/:id', component: FiliereDetail, canActivate: [authGuard], data: { roles: ['FORMATEUR', 'ADMIN'] } },
  { path: 'login', component: Login },
  { path: '', redirectTo: '/formateur', pathMatch: 'full' }
];
