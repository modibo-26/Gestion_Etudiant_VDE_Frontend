import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private authService = inject(Auth)
  private router =inject(Router)

  get logged(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('login')
  }

}
