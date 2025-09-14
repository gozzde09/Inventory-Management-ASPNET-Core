import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUpdateForm } from './stock-update-form';

describe('StockUpdateForm', () => {
  let component: StockUpdateForm;
  let fixture: ComponentFixture<StockUpdateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockUpdateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockUpdateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
