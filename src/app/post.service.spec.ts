import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { Apollo } from 'apollo-angular';

describe('PostService', () => {
  let service: PostService;
  let mockApollo: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    mockApollo = jasmine.createSpyObj<Apollo>('Apollo', ['query', 'mutate']);

    TestBed.configureTestingModule({
      providers: [PostService, { provide: Apollo, useValue: mockApollo }],
    });
    service = TestBed.inject(PostService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
