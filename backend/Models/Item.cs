using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagement.Models
{
  public enum StockStatus
  {
    Green, Yellow, Red
  }

  public class Item
  {
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Range(0, int.MaxValue, ErrorMessage = "Quantity cannot be negative")]
    public int Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    [NotMapped]
    public int LowStockThreshold => CriticalStockThreshold + (CriticalStockThreshold / 2);
    [Range(0, int.MaxValue, ErrorMessage = "Critical stock threshold cannot be negative")]
    public int CriticalStockThreshold { get; set; }

    public StockStatus Status =>
        Quantity <= CriticalStockThreshold ? StockStatus.Red :
        Quantity <= LowStockThreshold ? StockStatus.Yellow :
        StockStatus.Green;

    public string StatusColor => Status.ToString().ToLower();
  }
}
