export interface Item {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  criticalStockThreshold: number;
  status: 'Green' | 'Yellow' | 'Red';
  statusColor: string;
}

export interface CreateItemRequest {
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  criticalStockThreshold: number;
}
