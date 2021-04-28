import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private species = new BehaviorSubject(null);
  currentSpecies$ = this.species.asObservable();
  genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'n/a', value: 'n/a'}
  ];

  changeSpecies(species: string[]) {
    this.species.next(species);
  }
}

