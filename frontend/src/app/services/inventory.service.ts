import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateItemRequest, Item } from '../item-interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private baseUrl = 'http://localhost:5293/api/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  createItem(item: CreateItemRequest): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  adjustBalance(id: number, change: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/adjust-balance`, change);
  }
}
