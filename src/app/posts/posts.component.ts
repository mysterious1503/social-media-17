import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from '../post.service';
import { AuthService, AuthUser } from '../services/auth.service';

interface Post {
  id: string;
  title: string;
  views: number;
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error = '';
  showCreateForm = false;
  editingId: string | null = null;
  currentUser: AuthUser | null = null;

  postForm: FormGroup;

  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      views: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadPosts();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadPosts() {
    this.loading = true;
    this.error = '';
    this.postService.getPosts().subscribe({
      next: (result: any) => {
        this.posts = result.data.allPosts || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.error = 'Failed to load posts';
        this.loading = false;
      },
    });
  }

  onCreatePost() {
    if (this.postForm.invalid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    const { title, views } = this.postForm.value;
    this.postService.createPost(title, views).subscribe({
      next: () => {
        this.postForm.reset();
        this.showCreateForm = false;
        this.loadPosts();
      },
      error: (err) => {
        console.error('Error creating post:', err);
        this.error = 'Failed to create post';
      },
    });
  }

  onUpdatePost(postId: string) {
    if (this.postForm.invalid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    const { title, views } = this.postForm.value;
    this.postService.updatePost(postId, title, views).subscribe({
      next: () => {
        this.postForm.reset();
        this.editingId = null;
        this.loadPosts();
      },
      error: (err) => {
        console.error('Error updating post:', err);
        this.error = 'Failed to update post';
      },
    });
  }

  onDeletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (err) => {
          console.error('Error deleting post:', err);
          this.error = 'Failed to delete post';
        },
      });
    }
  }

  editPost(post: Post) {
    this.editingId = post.id;
    this.showCreateForm = true;
    this.postForm.patchValue({
      title: post.title,
      views: post.views,
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.showCreateForm = false;
    this.postForm.reset();
    this.error = '';
  }

  get isEditing(): boolean {
    return this.editingId !== null;
  }
}
