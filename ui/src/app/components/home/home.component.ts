import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Welcome, {{ user?.username }}!</h2>
      
      <div class="menu">
        <a class="menu-item" routerLink="/profile">Profile</a>
        <a class="menu-item" *ngIf="isAdmin" routerLink="/admin">Admin Dashboard</a>
        <a class="menu-item" (click)="logout()">Logout</a>
      </div>

      <div class="profile-info">
        <h3>Profile Information</h3>
        <p>Email: {{ user?.email }}</p>
        <p>Roles: {{ user?.roles?.join(', ') || '' }}</p>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isAdmin = user?.roles.includes('ADMIN') ?? false;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}