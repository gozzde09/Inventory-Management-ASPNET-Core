import { AddItemForm } from '../../components/add-item-form/add-item-form';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CreateItemRequest, Item } from '../../interfaces/item-model';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { StockUpdateForm } from '../../components/stock-update-form/stock-update-form';
import { ConfirmationModal } from '../../components/confirmation-modal/confirmation-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-items',
  imports: [AddItemForm, CommonModule, FormsModule],
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
    criticalStockThreshold: 10,
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

  isAddFormVisible = signal(false);

  // Stock update modal
  selectedItemForStockUpdate: Item | null = null;

  // Delete confirmation modal state
  isDeletingItem = signal<boolean>(false);

  constructor(
    private inventoryService: InventoryService,
    private stockUpdateForm: StockUpdateForm,
    private modalService: NgbModal
  ) {}

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
    this.inventoryService.createItem(this.newItem).subscribe({
      next: (item: Item) => {
        this.items.update((items) => [...items, item]);
      },
      error: (err: any) => alert('Misslyckades att skapa: ' + err.message),
    });
  }

  openAddForm(): void {
    this.isAddFormVisible.set(true);
  }
  closeAddForm(): void {
    this.isAddFormVisible.set(false);
  }
  onItemAdded(item: CreateItemRequest) {
    this.inventoryService.createItem(item).subscribe({
      next: (createdItem: Item) => {
        this.items.update((items) => [...items, createdItem]);
        this.closeAddForm();
      },
      error: (err: any) => alert('Failed to add item: ' + err.message),
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
  openDeleteConfirmation(item: Item): void {
    const modalRef = this.modalService.open(ConfirmationModal);
    modalRef.componentInstance.item = item;

    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.confirmDelete(item);
        }
      },
      () => {
        // Modal dismissed
      }
    );
  }

  closeDeleteModal(): void {
    // No longer needed since modal handles close
  }

  confirmDelete(item: Item): void {
    this.isDeletingItem.set(true);

    this.inventoryService.deleteItem(item.id).subscribe({
      next: () => {
        this.items.update((items) => items.filter((i) => i.id !== item.id));
        this.isDeletingItem.set(false);
      },
      error: (err: any) => {
        this.isDeletingItem.set(false);
        alert('Misslyckades att ta bort: ' + err.message);
      },
    });
  }

  // STOCK ADJUSTMENT
  showAdjustModal = signal<boolean>(false);
  selectedItemForAdjust = signal<Item | null>(null);
  adjustmentAmount = signal<number>(0);

  openStockUpdateModal(item: Item): void {
    this.stockUpdateForm.openStockUpdateModal(item, (updatedItem: Item) => {
      this.items.update((items) => items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    });
  }

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
