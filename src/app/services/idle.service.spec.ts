import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IdleService } from './idle.service';
import { AuthService } from './auth.service';
import { NgZone } from '@angular/core';

describe('IdleService', () => {
  let service: IdleService;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let ngZone: NgZone;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        IdleService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(IdleService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    ngZone = TestBed.inject(NgZone);
  });

  afterEach(() => {
    service.stopWatching();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('startWatching', () => {
    it('should add event listeners when startWatching is called', () => {
      spyOn(document, 'addEventListener');

      service.startWatching();

      expect(document.addEventListener).toHaveBeenCalledWith(
        'mousemove',
        jasmine.any(Function),
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'keydown',
        jasmine.any(Function),
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'click',
        jasmine.any(Function),
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'scroll',
        jasmine.any(Function),
      );
      expect(document.addEventListener).toHaveBeenCalledWith(
        'touchstart',
        jasmine.any(Function),
      );
    });

    it('should call resetTimer on mousemove', fakeAsync(() => {
      service.startWatching();

      const event = new MouseEvent('mousemove');
      document.dispatchEvent(event);

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should call resetTimer on keydown', fakeAsync(() => {
      service.startWatching();

      const event = new KeyboardEvent('keydown');
      document.dispatchEvent(event);

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should call resetTimer on click', fakeAsync(() => {
      service.startWatching();

      const event = new MouseEvent('click');
      document.dispatchEvent(event);

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should call resetTimer on scroll', fakeAsync(() => {
      service.startWatching();

      const event = new Event('scroll');
      document.dispatchEvent(event);

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should call resetTimer on touchstart', fakeAsync(() => {
      service.startWatching();

      const event = new TouchEvent('touchstart');
      document.dispatchEvent(event);

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));
  });

  describe('idle timeout', () => {
    it('should logout after 15 minutes of inactivity', fakeAsync(() => {
      service.startWatching();

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should reset timer on user activity and delay logout', fakeAsync(() => {
      service.startWatching();

      tick(14 * 60 * 1000);

      const event = new MouseEvent('mousemove');
      document.dispatchEvent(event);

      tick(14 * 60 * 1000);

      expect(authService.logout).not.toHaveBeenCalled();

      tick(1 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));

    it('should logout after 15 minutes without any activity', fakeAsync(() => {
      service.startWatching();

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    }));
  });

  describe('stopWatching', () => {
    it('should remove event listeners when stopWatching is called', () => {
      service.startWatching();
      spyOn(document, 'removeEventListener');

      service.stopWatching();

      expect(document.removeEventListener).toHaveBeenCalledWith(
        'mousemove',
        jasmine.any(Function),
      );
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'keydown',
        jasmine.any(Function),
      );
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'click',
        jasmine.any(Function),
      );
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'scroll',
        jasmine.any(Function),
      );
      expect(document.removeEventListener).toHaveBeenCalledWith(
        'touchstart',
        jasmine.any(Function),
      );
    });

    it('should clear the idle timer when stopWatching is called', fakeAsync(() => {
      service.startWatching();

      service.stopWatching();

      tick(15 * 60 * 1000);

      expect(authService.logout).not.toHaveBeenCalled();
    }));

    it('should prevent logout after stopWatching is called', fakeAsync(() => {
      service.startWatching();

      tick(10 * 60 * 1000);

      service.stopWatching();

      tick(10 * 60 * 1000);

      expect(authService.logout).not.toHaveBeenCalled();
    }));
  });

  describe('multiple startWatching calls', () => {
    it('should handle multiple startWatching calls', fakeAsync(() => {
      service.startWatching();

      tick(10 * 60 * 1000);

      service.startWatching();

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalledTimes(1);
    }));
  });

  describe('NgZone integration', () => {
    it('should run event listeners outside Angular zone', () => {
      spyOn(ngZone, 'runOutsideAngular').and.callThrough();

      service.startWatching();

      expect(ngZone.runOutsideAngular).toHaveBeenCalled();
    });

    it('should run logout logic inside Angular zone', fakeAsync(() => {
      spyOn(ngZone, 'run').and.callThrough();

      service.startWatching();

      tick(15 * 60 * 1000);

      expect(ngZone.run).toHaveBeenCalled();
    }));
  });

  describe('edge cases', () => {
    it('should not throw error when stopWatching is called without startWatching', () => {
      expect(() => {
        service.stopWatching();
      }).not.toThrow();
    });

    it('should handle rapid user activity without issues', fakeAsync(() => {
      service.startWatching();

      for (let i = 0; i < 10; i++) {
        tick(1 * 60 * 1000);
        document.dispatchEvent(new MouseEvent('mousemove'));
      }

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalled();
    }));

    it('should logout only once even with continuous events before timeout', fakeAsync(() => {
      service.startWatching();

      tick(15 * 60 * 1000);

      expect(authService.logout).toHaveBeenCalledTimes(1);
    }));
  });
});
