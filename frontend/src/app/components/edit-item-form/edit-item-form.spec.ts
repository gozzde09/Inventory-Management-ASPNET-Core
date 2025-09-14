import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemForm } from './edit-item-form';

describe('EditItemForm', () => {
  let component: EditItemForm;
  let fixture: ComponentFixture<EditItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditItemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditItemForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
