import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Item } from '../../item-interface';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  items = signal<Item[]>([]);
  totalItems = signal<number>(0);
  lowStock = signal<number>(0);
  criticalStock = signal<number>(0);

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.inventoryService.getItems().subscribe((data: Item[]) => {
      this.items.set(data);
      this.totalItems.set(data.length);
      this.lowStock.set(data.filter((item) => item.statusColor === 'yellow').length);
      this.criticalStock.set(data.filter((item) => item.statusColor === 'red').length);
    });
  }

  navigateToItems() {
    this.router.navigate(['/items']);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'Green':
        return 'OK';
      case 'Yellow':
        return 'Low';
      case 'Red':
        return 'Kritiskt';
      default:
        return status;
    }
  }

  getRecentItems(): Item[] {
    return this.items()
      .slice()
      .sort((a, b) => b.id - a.id)
      .slice(0, 10);
  }
}
