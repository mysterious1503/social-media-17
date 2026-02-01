import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../services/auth.service';
import { UserService, UserProfile } from '../services/user.service';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, UpperCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentUser: AuthUser | null = null;
  allUsers: UserProfile[] = [];
  loading: boolean = true;
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.currentUser.role === 'admin') {
      this.loadAllUsers();
    } else {
      this.loading = false;
    }
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.allUsers = users;
      this.loading = false;
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
