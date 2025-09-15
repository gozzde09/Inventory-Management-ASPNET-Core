export interface Item {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  criticalStockThreshold: number;
  statusColor: 'green' | 'yellow' | 'red';
}

export interface CreateItemRequest {
  name: string;
  quantity: number | null;
  unit: string;
  criticalStockThreshold: number | null;
}
