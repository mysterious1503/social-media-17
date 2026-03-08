import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PostService } from './post.service';

describe('AppComponent', () => {
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    postServiceSpy = jasmine.createSpyObj('PostService', [
      'getPosts',
      'createPost',
      'deletePost',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: PostService, useValue: postServiceSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'social-media-17' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('social-media-17');
  });
});
