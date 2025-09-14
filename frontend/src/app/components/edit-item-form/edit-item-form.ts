import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../interfaces/item-model';

@Component({
  selector: 'app-edit-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-item-form.html',
})
export class EditItemForm implements OnInit {
  @Input() item!: Item;
  @Output() save = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter<void>();

  editItem!: Item;

  ngOnInit(): void {
    this.editItem = { ...this.item };
  }

  onSave(): void {
    if (this.editItem.name && this.editItem.unit && this.editItem.criticalStockThreshold >= 0) {
      this.save.emit(this.editItem);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
