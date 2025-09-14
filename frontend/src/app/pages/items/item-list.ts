import { AddItemForm } from '../../components/add-item-form/add-item-form';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CreateItemRequest, Item } from '../../interfaces/item-model';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { StockUpdateForm } from '../../components/stock-update-form/stock-update-form';
import { ConfirmationDeleteModal } from '../../components/confirmation-delete-modal/confirmation-delete-modal';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { EditItemForm } from '../../components/edit-item-form/edit-item-form';

@Component({
  selector: 'app-items',
  imports: [AddItemForm, CommonModule, FormsModule, EditItemForm, NgbTooltipModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class Items implements OnInit {
  items = signal<Item[]>([]);
  filteredItems = signal<Item[]>([]);
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
    if (this.editId === item.id) {
      this.cancelEdit();
    } else {
      this.editId = item.id;
      this.editItem = { ...item };
    }
  }
  cancelEdit() {
    this.editId = null;
  }
  saveEdit(updatedItem: Item) {
    this.inventoryService.updateItem(updatedItem).subscribe({
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
    const modalRef = this.modalService.open(ConfirmationDeleteModal);
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

  openStockUpdateModal(item: Item): void {
    this.stockUpdateForm.openStockUpdateModal(item, (updatedItem: Item) => {
      this.items.update((items) => items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
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
