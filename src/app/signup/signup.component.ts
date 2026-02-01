import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  title: string = '';
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSignup() {
    if (
      !this.email ||
      !this.password ||
      !this.name ||
      !this.phone ||
      !this.title
    ) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService
      .signup(this.email, this.password, this.name, this.phone, this.title)
      .subscribe((success) => {
        this.loading = false;
        if (success) {
          this.success = 'Signup successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1500);
        } else {
          this.error = 'Email already exists';
        }
      });
  }
}
