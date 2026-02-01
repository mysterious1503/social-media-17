import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  title: string;
  role: 'admin' | 'user';
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  title: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Mock users database
  private mockUsers: User[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      phone: '+1 (555) 123-4567',
      title: 'Administrator',
      role: 'admin',
    },
    {
      id: 2,
      email: 'user1@example.com',
      password: 'user123',
      name: 'John Doe',
      phone: '+1 (555) 234-5678',
      title: 'Software Engineer',
      role: 'user',
    },
    {
      id: 3,
      email: 'user2@example.com',
      password: 'user123',
      name: 'Jane Smith',
      phone: '+1 (555) 345-6789',
      title: 'Product Manager',
      role: 'user',
    },
    {
      id: 4,
      email: 'user3@example.com',
      password: 'user123',
      name: 'Bob Wilson',
      phone: '+1 (555) 456-7890',
      title: 'UI/UX Designer',
      role: 'user',
    },
  ];

  constructor() {
    // Check if user is already logged in (from localStorage)
    this.checkStoredUser();
  }

  private checkStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        const user = this.mockUsers.find(
          (u) => u.email === email && u.password === password,
        );
        if (user) {
          const authUser: AuthUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            title: user.title,
            role: user.role,
          };
          this.currentUserSubject.next(authUser);
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('currentUser', JSON.stringify(authUser));
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 500);
    });
  }

  signup(
    email: string,
    password: string,
    name: string,
    phone: string,
    title: string,
  ): Observable<boolean> {
    return new Observable((observer) => {
      setTimeout(() => {
        // Check if email already exists
        if (this.mockUsers.some((u) => u.email === email)) {
          observer.next(false);
          observer.complete();
          return;
        }

        // Create new user
        const newUser: User = {
          id: this.mockUsers.length + 1,
          email,
          password,
          name,
          phone,
          title,
          role: 'user',
        };
        this.mockUsers.push(newUser);

        const authUser: AuthUser = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          title: newUser.title,
          role: newUser.role,
        };
        this.currentUserSubject.next(authUser);
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('currentUser', JSON.stringify(authUser));
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
