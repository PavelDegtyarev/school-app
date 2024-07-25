import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
  ) {
  }
  logout(event: Event) {
    event.preventDefault()
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  protected readonly localStorage = localStorage;
}
