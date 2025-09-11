import { Component, inject, OnInit } from '@angular/core';
import { Items as ItemsService } from '../services/items';
import { Observable } from 'rxjs';
import { Item } from '../types/items';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  imports: [CommonModule],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class ItemsComponent implements OnInit {
  items!: Observable<Item[]>;
  itemService = inject(ItemsService);

  ngOnInit(): void {
    this.items = this.itemService.getItems();
  }
}
