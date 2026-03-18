import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IdleService {
  private idleTimeOut = 15 * 60 * 1000;
  private idleTimer: any = null;
  private authService = inject(AuthService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  startWatching(): void {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', () => this.resetTimer());
      document.addEventListener('keydown', () => this.resetTimer());
      document.addEventListener('click', () => this.resetTimer());
      document.addEventListener('scroll', () => this.resetTimer());
      document.addEventListener('touchstart', () => this.resetTimer());
    });

    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

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
