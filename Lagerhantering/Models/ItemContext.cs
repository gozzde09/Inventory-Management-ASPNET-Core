using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Models
{
  public class ItemContext : DbContext
  {
    public DbSet<Item> Items { get; set; }
    public ItemContext(DbContextOptions<ItemContext> options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // Seed data 
      modelBuilder.Entity<Item>().HasData(
          new Item { Id = 1, Name = "Test Item", Quantity = 100, Unit = "st", LowStockThreshold = 10 },
          new Item { Id = 2, Name = "Sample Product", Quantity = 50, Unit = "kg", LowStockThreshold = 5 }
      );
    }
  }
}