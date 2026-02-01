import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
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
export class UserService {
  private usersSubject = new BehaviorSubject<UserProfile[]>([]);
  public users$ = this.usersSubject.asObservable();

  private mockUsers: UserProfile[] = [
    {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin User',
      phone: '+1 (555) 123-4567',
      title: 'Administrator',
      role: 'admin',
    },
    {
      id: 2,
      email: 'user1@example.com',
      name: 'John Doe',
      phone: '+1 (555) 234-5678',
      title: 'Software Engineer',
      role: 'user',
    },
    {
      id: 3,
      email: 'user2@example.com',
      name: 'Jane Smith',
      phone: '+1 (555) 345-6789',
      title: 'Product Manager',
      role: 'user',
    },
    {
      id: 4,
      email: 'user3@example.com',
      name: 'Bob Wilson',
      phone: '+1 (555) 456-7890',
      title: 'UI/UX Designer',
      role: 'user',
    },
  ];

  constructor() {
    this.usersSubject.next(this.mockUsers);
  }

  getAllUsers(): Observable<UserProfile[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.mockUsers);
        observer.complete();
      }, 300);
    });
  }

  getUserById(id: number): Observable<UserProfile | undefined> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.mockUsers.find((u) => u.id === id));
        observer.complete();
      }, 300);
    });
  }
}
