import { ChangeDetectorRef, Component } from '@angular/core';
import { BasicComponent } from '@app/basic-component';
import { Character } from '@app/models';
import { ListApiService } from '@app/services/list.api.service';
import { GridService } from '@app/states/grid.service';
import { ListService } from '@app/states/list.service';
import { FormFieldType } from '@models/form-field-type.enum';
import { FormField } from '@models/form-field.interface';
import { QueryParams } from '@models/query-params.interface';
import { of } from 'rxjs';
import { filter, finalize, switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent extends BasicComponent {
  characters: Character[] = [];
  uniqueIDs: number[] = [];
  dataSize = 0;
  isLoading = false;
  editableColumns: Record<string, FormField>;
  storedQueryParams;
  sortedColumn = 'id';

  constructor(private listApiService: ListApiService,
              private listService: ListService,
              private gridService: GridService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();

    this.getData();

    this.listService.currentSpecies$
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap(currentSpecies => {
          if (currentSpecies) {
            this.prepareListHelpers(currentSpecies);
            return of(null);
          } else {
            return this.listApiService.getSpecies();
          }
        }),
        filter(res => !!res))
      .subscribe(species => {
        this.listService.changeSpecies(species);
        this.prepareListHelpers(species);
      });
  }

  getData(queryParams?: QueryParams) {
    if (this.isLoading) {
      return;
    }
    this.storedQueryParams = queryParams;
    this.isLoading = true;
    this.listApiService.getCharacters(queryParams)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.componentDestroyed$))
      .subscribe((characters: Character[]) => {
        this.characters = characters;
        if (queryParams) {
          this.getFilteredDataLength(queryParams.searchValue);
        } else {
          this.dataSize = characters.length;
          this.uniqueIDs = [...Array.from(new Set(characters.map(item => item.id)))];
          this.gridService.changeUniqueIDs(this.uniqueIDs);
        }
      });
  }

  private getFilteredDataLength(searchValue: string) {
    // WE HAVE TO FETCH ALL THE DATA WITHOUT PAGINATION TO KNOW THE FULL SIZE OF FILTERED DATA
    this.listApiService.getCharacters({searchValue, pageIndex: null, sortParams: null})
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(characters => {
        this.dataSize = characters.length;
      });
  }

  onRemoveRecord(recordID: string | number) {
    this.listApiService.removeCharacter(recordID)
      .pipe(
        finalize(() => {
          this.characters = this.characters.filter(char => char.id !== recordID);
          let queryParams = this.storedQueryParams;
          if (!this.characters.length) {
            this.gridService.reducePageIndex();
            queryParams = {...this.storedQueryParams, pageIndex: this.storedQueryParams.pageIndex - 1};
          }
          this.uniqueIDs = this.uniqueIDs.filter(id => id !== recordID);
          this.gridService.changeUniqueIDs(this.uniqueIDs);
          this.getData(queryParams);
        }),
        take(1))
      .subscribe();
  }

  onUpdateRecord(updatedCharacter: Character) {
    this.isLoading = true;
    this.listApiService.updateCharacter(updatedCharacter)
      .pipe(
        finalize(() => {
          const existingCharacter = this.characters.find(char => char.id === updatedCharacter.id);
          if (existingCharacter) {
            const index = this.characters.indexOf(existingCharacter);
            this.characters[index] = updatedCharacter;
            this.changeDetectorRef.detectChanges();
          }
          this.isLoading = false;
        }),
        take(1))
      .subscribe();
  }

  prepareListHelpers(species: string[]) {
    const speciesOptions = species.map(element => {
      return {value: element, label: element};
    });

    this.editableColumns = {
      name: {type: FormFieldType.TEXT, required: true},
      species: {type: FormFieldType.SELECT, options: speciesOptions, required: true},
      gender: {type: FormFieldType.RADIO, options: this.listService.genderOptions, required: true},
      homeworld: {type: FormFieldType.TEXT}
    };
  }
}


