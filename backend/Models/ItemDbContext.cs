using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Models
{
  public class ItemDbContext : DbContext
  {
    public DbSet<Item> Items { get; set; }
    public ItemDbContext() { }

    public ItemDbContext(DbContextOptions<ItemDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite("Data Source=inventory.db");
    }

  }

}
