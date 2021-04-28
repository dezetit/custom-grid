import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormService } from './form.service';

describe('FormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormService = TestBed.get(FormService);
    expect(service).toBeTruthy();
  });

  it('findFirstEmptyID should return first empty ID', () => {
    const service: FormService = TestBed.get(FormService);
    const uniqueIDs = [1, 2, 3, 4, 6, 7, 8];

    expect(service.findFirstEmptyID(uniqueIDs)).toEqual(5);
  });

  it('findFirstEmptyID should return first empty ID', () => {
    const service: FormService = TestBed.get(FormService);
    const uniqueIDs = [1, 2, 3, 4, 6, 7, 8];

    expect(service.findFirstEmptyID(uniqueIDs)).toEqual(5);
  });

  it('markFormGroupTouched should set all of form controls as touched', () => {
    const service: FormService = TestBed.get(FormService);
    const formGroup: FormGroup = new FormGroup({});
    for (let i = 0; i < 5; i++) {
      const formControl: FormControl = new FormControl(null, Validators.required);
      formGroup.addControl(`${i}`, formControl);
    }

    let areAllTouched = true;
    service.markFormGroupTouched(formGroup);
    for (let i = 0; i < 5; i++) {
      if (!formGroup.get(`${i}`).touched) {
        areAllTouched = false;
        break;
      }
    }

    expect(areAllTouched).toBe(true);
  });
});
