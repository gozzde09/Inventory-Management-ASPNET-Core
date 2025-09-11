namespace InventoryManagement.Models
{
  public class Item
  {
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;

    // Tröskelärde för lågt saldo
    public int LowStockThreshold { get; set; } = 10;

    // Om lagersaldot är under tröskelvärdet
    public bool IsLowStock => Quantity < LowStockThreshold;
  }
}
