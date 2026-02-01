import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'social-media-17';

  private idleService = inject(IdleService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // Start idle detection only if user is authenticated
    if (this.authService.isAuthenticated()) {
      this.idleService.startWatching();
    }

    // Subscribe to authentication changes
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.idleService.startWatching();
      } else {
        this.idleService.stopWatching();
      }
    });
  }

  ngOnDestroy(): void {
    this.idleService.stopWatching();
  }
}
