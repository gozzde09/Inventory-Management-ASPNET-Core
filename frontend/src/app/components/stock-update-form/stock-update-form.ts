import { Injectable, Component, Input, OnInit } from '@angular/core';
import { NgbAlertModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../interfaces/item-model';
import { InventoryService } from '../../services/inventory.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryValidators } from '../../inventory.validators';

@Injectable({
  providedIn: 'root',
})
export class StockUpdateForm {
  constructor(private modalService: NgbModal) {}

  openStockUpdateModal(item: Item, onUpdate: (updatedItem: Item) => void): void {
    const modalRef = this.modalService.open(StockUpdateModalContent);
    modalRef.componentInstance.item = item;

    modalRef.result.then(
      (result: Item) => {
        if (result) {
          onUpdate(result);
        }
      },
      () => {
        // Modal dismissed
      }
    );
  }
}
@Component({
  selector: 'app-stock-update-modal-content',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbAlertModule],
  templateUrl: './stock-update-form.html',
})
export class StockUpdateModalContent implements OnInit {
  @Input() item!: Item;

  inventoryForm!: FormGroup;
  newBalance: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.updateNewBalance();
  }

  private initializeForm(): void {
    this.inventoryForm = this.fb.group({
      article: [{ value: this.item.name, disabled: true }],
      currentQuantity: [{ value: this.item.quantity, disabled: true }],
      changeType: ['add', Validators.required],
      quantityChange: [
        1,
        [
          Validators.required,
          Validators.min(1),
          InventoryValidators.nonNegative(),
          InventoryValidators.notZero(),
          InventoryValidators.digitsOnly(),
        ],
      ],
    });

    // Subscribe to form changes to update new balance and set stockNegative error
    this.inventoryForm.valueChanges.subscribe(() => {
      this.updateNewBalance();
      this.checkStockNegative();
    });
  }

  private updateNewBalance(): void {
    const currentQuantity = Number(this.item.quantity);
    const changeType = this.inventoryForm.get('changeType')?.value;
    const quantityChange = Number(this.inventoryForm.get('quantityChange')?.value) || 0;

    if (changeType === 'add') {
      this.newBalance = currentQuantity + quantityChange;
    } else {
      this.newBalance = currentQuantity - quantityChange;
    }
  }

  private checkStockNegative(): void {
    const errors = { ...this.inventoryForm.errors };
    if (this.newBalance < 0) {
      errors['stockNegative'] = true;
    } else {
      delete errors['stockNegative'];
    }
    this.inventoryForm.setErrors(Object.keys(errors).length ? errors : null);
  }

  incrementQuantity(): void {
    const currentValue = Number(this.inventoryForm.get('quantityChange')?.value) || 0;
    this.inventoryForm.get('quantityChange')?.setValue(currentValue + 1);
  }

  decrementQuantity(): void {
    const currentValue = this.inventoryForm.get('quantityChange')?.value || 0;
    if (currentValue > 1) {
      this.inventoryForm.get('quantityChange')?.setValue(currentValue - 1);
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const changeType = this.inventoryForm.get('changeType')?.value;
      const quantityChange = Number(this.inventoryForm.get('quantityChange')?.value);

      // Calculate the adjustment amount (positive for add, negative for remove)
      const adjustment = changeType === 'add' ? quantityChange : -quantityChange;

      this.inventoryService.adjustBalance(this.item.id, adjustment).subscribe({
        next: (updatedItem: Item) => {
          this.activeModal.close(updatedItem);
        },
        error: (err: any) => {
          alert('Misslyckades att uppdatera saldo: ' + err.message);
        },
      });
    }
  }
  getStockStatus(balance: number, item: any): 'danger' | 'warning' | 'success' {
    if (balance <= item.criticalStockThreshold) {
      return 'danger';
    }
    if (balance <= item.lowStockThreshold) {
      return 'warning';
    }
    return 'success';
  }
}
