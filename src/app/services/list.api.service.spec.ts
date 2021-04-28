import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Character, QueryParams, SortingOrder } from '@app/models';
import { of } from 'rxjs';

import { ListApiService } from './list.api.service';

describe('ListApiService', () => {
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    http = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
  });

  it('should be created', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    expect(service).toBeTruthy();
  });

  it('getSpecies should call get method', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    http.get.and.returnValue(of({}));

    service.getSpecies().subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('getCharacters should call get method', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    http.get.and.returnValue(of({}));

    service.getCharacters().subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('getCharacters with params should call get method', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    const params: QueryParams = {pageIndex: 1, searchValue: 'test', sortParams: {sortingOrder: SortingOrder.ASC, columnName: 'id'}};
    http.get.and.returnValue(of({}));

    service.getCharacters(params).subscribe(() => {
      expect(http.get).toHaveBeenCalled();
    });
  });

  it('addCharacter should call post method', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    const character: Character = {id: 1, gender: 'male', species: 'Droid', name: 'TestName', homeworld: 'earth'};
    http.post.and.returnValue(of({}));

    service.addCharacter(character).subscribe(() => {
      expect(http.post).toHaveBeenCalled();
    });
  });

  it('removeCharacter should call delete method', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    http.delete.and.returnValue(of({}));

    service.removeCharacter(1).subscribe(() => {
      expect(http.delete).toHaveBeenCalled();
    });
  });

  it('updateCharacter should call put method', () => {
    const service: ListApiService = TestBed.get(ListApiService);
    const character: Character = {id: 1, gender: 'male', species: 'Droid', name: 'TestName', homeworld: 'earth'};
    http.put.and.returnValue(of({}));

    service.addCharacter(character).subscribe(() => {
      expect(http.put).toHaveBeenCalled();
    });
  });
});
