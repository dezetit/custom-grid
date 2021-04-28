import { TestBed } from '@angular/core/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridService = TestBed.get(GridService);
    expect(service).toBeTruthy();
  });

  it('change unique IDs should update a value', (done: DoneFn) => {
    const service: GridService = TestBed.get(GridService);
    const IDs = [1, 2, 3, 4, 5];
    service.changeUniqueIDs(IDs);
    service.currentUniqueIDs$.subscribe(value => {
      expect(value).toEqual(IDs);
      done();
    });
  });

  it('currentUniqueIDs should return a value', (done: DoneFn) => {
    const service: GridService = TestBed.get(GridService);
    const IDs = [1, 2, 3, 4, 5];
    service.changeUniqueIDs(IDs);
    service.currentUniqueIDs$.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });
});
