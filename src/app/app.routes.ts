import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent, // This acts as our Layout/Shell
    canActivate: [authGuard],
    children: [
      {
        path: 'org-info',
        loadComponent: () =>
          import('./org-info/org-info.component').then(
            (m) => m.OrgInfoComponent,
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./posts/posts.component').then((m) => m.PostsComponent),
      },
      { path: '', redirectTo: 'org-info', pathMatch: 'full' }, // Default child
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
