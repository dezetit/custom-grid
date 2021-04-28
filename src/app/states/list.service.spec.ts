import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';

describe('ListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });

  it('current species should return some value', (done: DoneFn) => {
    const service: ListService = TestBed.get(ListService);
    service.changeSpecies(['test1', 'test2']);
    service.currentSpecies$.subscribe(value => {
      expect(value).toBeTruthy();
      done();
    });
  });

  it('change species should update value', (done: DoneFn) => {
    const service: ListService = TestBed.get(ListService);
    const primaryValue = ['test1', 'test2'];
    service.changeSpecies(primaryValue);
    service.currentSpecies$.subscribe(value => {
      expect(value).toEqual(primaryValue);
      done();
    });
  });
});
