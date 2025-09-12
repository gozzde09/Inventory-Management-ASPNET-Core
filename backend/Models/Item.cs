using System.ComponentModel.DataAnnotations;
namespace InventoryManagement.Models

{
  public class Item
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;

    // Tröskelärde för lågt saldo
    public int LowStockThreshold { get; set; } 

    // Om lagersaldot är under tröskelvärdet
    public bool IsLowStock => Quantity < LowStockThreshold;
  }
}
