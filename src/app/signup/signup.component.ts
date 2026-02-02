import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  loading: boolean = false;
  error: string = '';
  success: string = '';
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  signupForm: FormGroup;

  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      this.error = 'Please fill in all fields correctly';
      return;
    }

    const { email, password, name, phone, title } = this.signupForm.value;

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService
      .signup(email, password, name, phone, title)
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
