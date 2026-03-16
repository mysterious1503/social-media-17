import { Component, OnInit, inject } from '@angular/core';
import { AuthService, AuthUser } from '../services/auth.service';
import { UserService, UserProfile } from '../services/user.service';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-org-info',
  standalone: true,
  imports: [NgClass, UpperCasePipe],
  templateUrl: './org-info.component.html',
  styleUrl: './org-info.component.scss',
})
export class OrgInfoComponent implements OnInit {
  currentUser: AuthUser | null = null;
  allUsers: UserProfile[] = [];
  loading: boolean = true;

  private authService = inject(AuthService);
  private userService = inject(UserService);

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    if (this.isAdmin()) {
      this.userService.getAllUsers().subscribe((users) => {
        this.allUsers = users;
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}
