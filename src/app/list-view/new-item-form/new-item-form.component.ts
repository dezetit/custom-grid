import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BasicComponent } from '@app/basic-component';
import { Character } from '@app/models';
import { ListApiService } from '@app/services/list.api.service';
import { FormService } from '@app/states/form.service';
import { GridService } from '@app/states/grid.service';
import { ListService } from '@app/states/list.service';
import { FormFieldType } from '@models/form-field-type.enum';
import { FormField } from '@models/form-field.interface';
import { of } from 'rxjs';
import { filter, finalize, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sl-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent extends BasicComponent {
  @Input() uniqueIDs = [];
  formItems: FormField[];
  isSaving = false;

  constructor(private listApiService: ListApiService,
              private listService: ListService,
              private gridService: GridService,
              private formService: FormService,
              private router: Router) {
    super();

    this.listService.currentSpecies$
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap(currentSpecies => {
          if (currentSpecies) {
            this.prepareNewListItemFormData(currentSpecies);
            return of(null);
          } else {
            return this.listApiService.getSpecies();
          }
        }),
        filter(res => !!res))
      .subscribe(species => {
        this.listService.changeSpecies(species);
        this.prepareNewListItemFormData(species);
      });

    this.gridService.currentUniqueIDs$
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap(uniqueIDs => {
            if (uniqueIDs) {
              this.uniqueIDs = uniqueIDs;
              return of(null);
            }
            return this.listApiService.getCharacters();
          }
        ),
        filter(res => !!res))
      .subscribe((characters: Character[]) => this.uniqueIDs = [...Array.from(new Set(characters.map(item => item.id)))]);
  }

  onSubmit(formValue: any) {
    this.isSaving = true;
    this.listApiService.addCharacter({id: this.formService.findFirstEmptyID(this.uniqueIDs), ...formValue})
      .pipe(
        finalize(() => {
          this.isSaving = false;
        }),
        takeUntil(this.componentDestroyed$))
      .subscribe(() => this.router.navigate(['']));
  }

  private prepareNewListItemFormData(species: string[]) {
    const speciesOptions = species.map(element => {
      return {value: element, label: element};
    });

    this.formItems = [
      {fieldName: 'name', label: 'Name', type: FormFieldType.TEXT, required: true},
      {fieldName: 'species', label: 'Species', type: FormFieldType.SELECT, required: true, options: speciesOptions},
      {fieldName: 'gender', label: 'Gender', type: FormFieldType.RADIO, required: true, options: this.listService.genderOptions},
      {fieldName: 'homeworld', label: 'Home World', type: FormFieldType.TEXT},
    ];
  }
}
