import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserProfile, UserService } from './user.service';
import { User } from './auth.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
  });

  it('should create an instance', () => {
    expect(userService).toBeTruthy();
  });

  it('should return an Observable', () => {
    const result = userService.getAllUsers();
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();
  });

  it('should emit mockUsers from getAllUsers()', (done) => {
    userService.getAllUsers().subscribe((users: UserProfile[]) => {
      expect(users).toBeDefined();
      expect(users.length).toBe(4);
      done();
    });
  });

  // Tests for getUserById method
  it('should return an Observable from getUserById', () => {
    const result = userService.getUserById(1);
    expect(result).toBeDefined();
    expect(result.subscribe).toBeDefined();
  });

  it('should return the correct user when valid id is provided', (done) => {
    userService.getUserById(1).subscribe((user: UserProfile | undefined) => {
      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
      expect(user?.email).toBe('admin@example.com');
      expect(user?.name).toBe('Admin User');
      expect(user?.role).toBe('admin');
      done();
    });
  });

  it('should return undefined for non-existent user id', (done) => {
    userService.getUserById(999).subscribe((user: UserProfile | undefined) => {
      expect(user).toBeUndefined();
      done();
    });
  });

  it('should return the correct user by id using fakeAsync', fakeAsync(() => {
    let emittedUser: UserProfile | undefined;

    userService.getUserById(2).subscribe((user) => {
      emittedUser = user;
    });

    tick(300);

    expect(emittedUser).toBeDefined();
    expect(emittedUser?.id).toBe(2);
    expect(emittedUser?.name).toBe('John Doe');
    expect(emittedUser?.title).toBe('Software Engineer');
  }));

  it('should emit different users for different ids', fakeAsync(() => {
    let user1: UserProfile | undefined;
    let user2: UserProfile | undefined;

    userService.getUserById(1).subscribe((user) => {
      user1 = user;
    });

    userService.getUserById(3).subscribe((user) => {
      user2 = user;
    });

    tick(300);

    expect(user1?.name).toBe('Admin User');
    expect(user2?.name).toBe('Jane Smith');
    expect(user1?.id).not.toBe(user2?.id);
  }));

  it('should complete the observable after emitting user', (done) => {
    let completed = false;

    userService.getUserById(4).subscribe({
      next: (user) => {
        expect(user).toBeDefined();
      },
      complete: () => {
        completed = true;
      },
    });

    setTimeout(() => {
      expect(completed).toBe(true);
      done();
    }, 400);
  });

  it('should emit correct user data from getAllUsers()', (done) => {
    userService.getAllUsers().subscribe((users: UserProfile[]) => {
      expect(users[0].id).toBe(1);
      expect(users[0].email).toBe('admin@example.com');
      expect(users[0].name).toBe('Admin User');
      expect(users[0].role).toBe('admin');
      done();
    });
  });

  it('should complete the observable', (done) => {
    let completed = false;

    userService.getAllUsers().subscribe({
      next: () => {},
      complete: () => {
        completed = true;
      },
    });

    setTimeout(() => {
      expect(completed).toBe(true);
      done();
    }, 400);
  });

  it('should emit after 300ms delay using fakeAsync', fakeAsync(() => {
    let emitted = false;
    let users: UserProfile[] = [];

    userService.getAllUsers().subscribe((data) => {
      emitted = true;
      users = data;
    });

    expect(emitted).toBe(false);

    tick(300);

    expect(emitted).toBe(true);
    expect(users.length).toBe(4);
  }));

  it('should emit all 4 mock users with correct properties', fakeAsync(() => {
    const expectedUsers: UserProfile[] = [
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

    let emittedUsers: UserProfile[] = [];

    userService.getAllUsers().subscribe((users) => {
      emittedUsers = users;
    });

    tick(300);

    expect(emittedUsers).toEqual(expectedUsers);
  }));

  it('should initialize with mockUsers in usersSubject', (done) => {
    userService.users$.subscribe((users) => {
      expect(users).toBeDefined();
      expect(users.length).toBe(4);
      expect(users[0].name).toBe('Admin User');
      done();
    });
  });

  it('should have users$ observable emit initial users', fakeAsync(() => {
    let emittedUsers: UserProfile[] = [];

    userService.users$.subscribe((users) => {
      emittedUsers = users;
    });

    tick();

    expect(emittedUsers.length).toBe(4);
    expect(emittedUsers[0].role).toBe('admin');
  }));
});
