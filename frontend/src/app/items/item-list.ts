import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateItemRequest, Item } from '../interfaces/item-model';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-items',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class Items implements OnInit {
  items = signal<Item[]>([]);
  filteredItems = signal<Item[]>([]);
  newItem: CreateItemRequest = {
    name: '',
    quantity: 0,
    unit: '',
    lowStockThreshold: 10,
    criticalStockThreshold: 5,
  };

  editId: number | null = null;
  editItem: Item = {
    id: 0,
    name: '',
    quantity: 0,
    unit: '',
    lowStockThreshold: 10,
    criticalStockThreshold: 5,
    status: 'Green',
    statusColor: 'green',
  };

  // Filter and sort
  selectedFilter = signal<'all' | 'good' | 'low' | 'critical'>('all');
  sortField = signal<keyof Item>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');

  // Adjust stock modal
  showAdjustModal = signal<boolean>(false);
  selectedItemForAdjust = signal<Item | null>(null);
  adjustmentAmount = signal<number>(0);

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventoryService.getItems().subscribe((data: Item[]) => {
      this.items.set(data);
    });
  }

  // CREATE
  addItem() {
    if (this.newItem.criticalStockThreshold > this.newItem.lowStockThreshold) {
      alert('Kritisk tröskel kan inte vara högre än låg lagertröskel');
      return;
    }

    this.inventoryService.createItem(this.newItem).subscribe({
      next: (item: Item) => {
        this.items.update((items) => [...items, item]);
      },
      error: (err: any) => alert('Misslyckades att skapa: ' + err.message),
    });
  }

  // EDIT
  startEdit(item: Item) {
    this.editId = item.id;
    this.editItem = { ...item };
  }

  cancelEdit() {
    this.editId = null;
  }

  saveEdit(original: Item) {
    if (this.editItem.criticalStockThreshold > this.editItem.lowStockThreshold) {
      alert('Kritisk tröskel kan inte vara högre än låg lagertröskel');
      return;
    }

    this.inventoryService.updateItem(this.editItem).subscribe({
      next: (updatedItem: Item) => {
        this.items.update((items) =>
          items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );

        this.editId = null;
      },
      error: (err: any) => alert('Misslyckades att uppdatera: ' + err.message),
    });
  }

  // DELETE
  deleteItem(item: Item) {
    if (confirm(`Är du säker på att du vill ta bort "${item.name}"?`)) {
      this.inventoryService.deleteItem(item.id).subscribe({
        next: () => {
          this.items.update((items) => items.filter((i) => i.id !== item.id));
        },
        error: (err: any) => alert('Misslyckades att ta bort: ' + err.message),
      });
    }
  }

  // STOCK ADJUSTMENT
  openAdjustModal(item: Item) {
    this.selectedItemForAdjust.set(item);
    this.adjustmentAmount.set(0);
    this.showAdjustModal.set(true);
  }

  closeAdjustModal() {
    this.showAdjustModal.set(false);
    this.selectedItemForAdjust.set(null);
    this.adjustmentAmount.set(0);
  }

  quickAdjust(item: Item, change: number) {
    this.inventoryService.adjustBalance(item.id, change).subscribe({
      next: (response) => {
        this.items.update((items) =>
          items.map((i) => (i.id === item.id ? { ...i, ...response } : i))
        );
      },
      error: (err: any) => alert('Misslyckades att justera lager: ' + err.message),
    });
  }

  confirmAdjustment() {
    const item = this.selectedItemForAdjust();
    const amount = this.adjustmentAmount();

    if (!item || !amount) return;

    if (item.quantity + amount < 0) {
      alert('Lagret kan inte bli negativt');
      return;
    }

    this.inventoryService.adjustBalance(item.id, amount).subscribe({
      next: (response) => {
        this.items.update((items) =>
          items.map((i) => (i.id === item.id ? { ...i, ...response } : i))
        );
        this.closeAdjustModal();
      },
      error: (err: any) => alert('Misslyckades att justera lager: ' + err.message),
    });
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'yellow':
        return 'table-warning';
      case 'red':
        return 'table-danger';
      default:
        return '';
    }
  }
}
