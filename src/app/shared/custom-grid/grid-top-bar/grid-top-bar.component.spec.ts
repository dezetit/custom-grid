import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { GridTopBarComponent } from './grid-top-bar.component';

describe('GridTopBarComponent', () => {
  let component: GridTopBarComponent;
  let fixture: ComponentFixture<GridTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridTopBarComponent],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
