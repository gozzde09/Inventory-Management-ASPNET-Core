import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../types/items';

@Injectable({
  providedIn: 'root',
})
export class Items {
  constructor(private http: HttpClient) {}
  getItems = (): Observable<Item[]> => this.http.get<Item[]>('http://localhost:5265/api/items');
}
