import { Injectable } from '@angular/core';
import { Character } from '@app/models';
import { QueryParams } from '@models/query-params.interface';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {
  constructor(private apiService: ApiService) {
  }

  getSpecies(): Observable<string[]> {
    return this.apiService.get('species');
  }

  getCharacters(queryParams?: QueryParams): Observable<Character[]> {
    let prefix = '';
    let query = '';

    if (queryParams) {
      if (queryParams.pageIndex) {
        query = `${query}${prefix}_page=${queryParams.pageIndex}`;
        prefix = '&';
      }

      if (queryParams.searchValue) {
        query = `${query}${prefix}q=${queryParams.searchValue}`;
        prefix = '&';
      }

      if (queryParams.sortParams) {
        query = `${query}${prefix}_sort=${queryParams.sortParams.columnName}&_order=${queryParams.sortParams.sortingOrder}`;
        prefix = '&';
      }
    }

    return this.apiService.get(`characters${query.length ? `?${query}` : ''}`);
  }

  addCharacter(character: Character) {
    return this.apiService.post('characters', character);
  }

  removeCharacter(characterID: string | number) {
    return this.apiService.delete(`characters/${characterID}`);
  }

  updateCharacter(character: Character) {
    return this.apiService.put(`characters/${character.id}`, character);
  }
}
