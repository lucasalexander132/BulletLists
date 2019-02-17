import { TestBed } from '@angular/core/testing';

import { TasklistService } from './tasklist.service';

describe('TasklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasklistService = TestBed.get(TasklistService);
    expect(service).toBeTruthy();
  });
});
