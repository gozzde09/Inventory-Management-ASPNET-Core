import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../interfaces/items';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items',
  imports: [CommonModule, FormsModule],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { id: 0, name: '', quantity: 0, unit: '' };

  editId: number | null = null;
  editItem: Item = { id: 0, name: '', quantity: 0, unit: '' };

  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe((data: Item[]) => (this.items = data));
  }

  // CREATE
  addItem() {
    this.itemService.createItem(this.newItem).subscribe({
      next: (item: Item) => {
        this.items.push(item);
        this.newItem = { id: 0, name: '', quantity: 0, unit: '' };
      },
      error: (err: string) => alert('Misslyckades att skapa: ' + err),
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
    this.itemService.updateItem(this.editItem).subscribe({
      next: () => {
        Object.assign(original, this.editItem);
        this.editId = null;
      },
      error: (err: string) => alert('Misslyckades att uppdatera: ' + err),
    });
  }

  // DELETE
  deleteItem(item: Item) {
    if (confirm(`Är du säker på att du vill ta bort "${item.name}"?`)) {
      this.itemService.deleteItem(item.id).subscribe({
        next: () => (this.items = this.items.filter((i) => i.id !== item.id)),
        error: (err: string) => alert('Misslyckades att ta bort: ' + err),
      });
    }
  }
}
