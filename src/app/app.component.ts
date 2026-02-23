import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { IdleService } from './services/idle.service';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'social-media-17';
  posts: any[] = [];

  private idleService = inject(IdleService);
  private authService = inject(AuthService);
  private postService = inject(PostService);

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

    this.postService.getPosts().subscribe(({ data }: any) => {
      this.posts = data.allPosts;
    });
  }

  ngOnDestroy(): void {
    this.idleService.stopWatching();
  }

  addNew() {
    this.postService.createPost('New Post', 0).subscribe();
  }

  remove(id: string) {
    this.postService.deletePost(id).subscribe();
  }
}
