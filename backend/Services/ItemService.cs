using InventoryManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Services
{
  public class ItemService : IItemService
  {
    private readonly ItemDbContext _context;

    public ItemService(ItemDbContext context)
    {
      _context = context;
    }

    public async Task<Item> CreateItemAsync(Item item)
    {
      // Validation: Check for duplicate names
      var existingItem = await _context.Items
          .FirstOrDefaultAsync(i => i.Name.ToLower() == item.Name.ToLower());

      if (existingItem != null)
      {
        throw new InvalidOperationException($"An item with name '{item.Name}' already exists.");
      }

      await _context.AddAsync(item);
      await _context.SaveChangesAsync();

      return item;
    }

    // READ
    public async Task<IEnumerable<Item>> GetItemsAsync()
    {
      return await _context.Items.AsNoTracking().ToListAsync();
    }
    // UPDATE
    public async Task<Item> EditItemAsync(int id, Item item)
    {
      if (id != item.Id)
      {
        throw new ArgumentException("Item ID mismatch");
      }

      var itemFromDb = await _context.Items.FindAsync(id);
      if (itemFromDb is null)
      {
        throw new KeyNotFoundException($"Item with ID {id} not found.");
      }

      // Check for duplicate names (excluding current item)
      var duplicateItem = await _context.Items
          .FirstOrDefaultAsync(i => i.Name.ToLower() == item.Name.ToLower() && i.Id != id);

      if (duplicateItem != null)
      {
        throw new InvalidOperationException($"An item with name '{item.Name}' already exists.");
      }

      // Update allowed fields
      itemFromDb.Name = item.Name;
      itemFromDb.Unit = item.Unit;
      itemFromDb.CriticalStockThreshold = item.CriticalStockThreshold;

      await _context.SaveChangesAsync();

      return itemFromDb;
    }

    // DELETE
    public async Task DeleteItemAsync(int id)
    {
      var item = await _context.Items.FindAsync(id);
      if (item is null)
      {
        throw new KeyNotFoundException($"Item with ID {id} not found.");
      }

      _context.Items.Remove(item);
      await _context.SaveChangesAsync();
    }

    // PATCH - Update stock
    public async Task<Item> AdjustBalanceAsync(int id, int change)
    {
      var item = await _context.Items.FindAsync(id);
      if (item is null)
      {
        throw new KeyNotFoundException($"Item with ID {id} not found.");
      }

      int newBalance = item.Quantity + change;
      item.Quantity = newBalance;
      await _context.SaveChangesAsync();

      return item;
    }
  }
}
