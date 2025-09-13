import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateItemRequest, Item } from '../../interfaces/item-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item-form.html',
  styleUrl: './add-item-form.css',
  standalone: true,
})
export class AddItemForm {
  newItem: CreateItemRequest = {
    name: '',
    quantity: 0,
    unit: '',
    criticalStockThreshold: 5,
  };
  @Input() existingItems: Item[] = [];
  @Output() itemAdded = new EventEmitter<CreateItemRequest>();
  @Output() cancel = new EventEmitter<void>();

  itemExists(name: string): boolean {
    if (!name) return false;
    return this.existingItems.some((item) => item.name.toLowerCase() === name.toLowerCase());
  }

  addItem() {
    if (this.newItem.name && this.newItem.unit && this.newItem.quantity >= 0) {
      this.itemAdded.emit(this.newItem);
      this.resetForm();
    }
  }

  closeAddForm() {
    this.resetForm();
    this.cancel.emit();
  }

  resetForm() {
    this.newItem = {
      name: '',
      quantity: 0,
      unit: '',
      criticalStockThreshold: 0,
    };
  }
}
