import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdleService {
  private idleTimeOut = 15 * 60 * 1000; // 15 minutes in milliseconds
  private idleTimer: any = null;
  private idle$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  startWatching(): void {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      // Listen to user activity events
      document.addEventListener('mousemove', () => this.resetTimer());
      document.addEventListener('keydown', () => this.resetTimer());
      document.addEventListener('click', () => this.resetTimer());
      document.addEventListener('scroll', () => this.resetTimer());
      document.addEventListener('touchstart', () => this.resetTimer());
    });

    // Start the initial timer
    this.resetTimer();
  }

  private resetTimer(): void {
    // Clear existing timer
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    // Set a new timer
    this.idleTimer = setTimeout(() => {
      this.ngZone.run(() => {
        this.logout();
      });
    }, this.idleTimeOut);
  }

  private logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  stopWatching(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
    document.removeEventListener('mousemove', () => this.resetTimer());
    document.removeEventListener('keydown', () => this.resetTimer());
    document.removeEventListener('click', () => this.resetTimer());
    document.removeEventListener('scroll', () => this.resetTimer());
    document.removeEventListener('touchstart', () => this.resetTimer());
  }
}
