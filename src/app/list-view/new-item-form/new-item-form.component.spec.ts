import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

import { NewItemFormComponent } from './new-item-form.component';

describe('NewItemFormComponent', () => {
  let component: NewItemFormComponent;
  let fixture: ComponentFixture<NewItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewItemFormComponent], imports: [SharedModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
