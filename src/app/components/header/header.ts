import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { LucideAngularModule, LogOut } from 'lucide-angular';


@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  readonly LogOut = LogOut ;


  private authService = inject(Auth)
  private router =inject(Router)

  get logged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('login')
  }

  home() {
    this.router.navigateByUrl('login')
  }

}
