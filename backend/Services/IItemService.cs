using InventoryManagement.Models;

namespace InventoryManagement.Services
{
  public interface IItemService
  {
    Task<Item> CreateItemAsync(Item item);
    Task<IEnumerable<Item>> GetItemsAsync();
    Task<Item> EditItemAsync(int id, Item item);
    Task DeleteItemAsync(int id);
    Task<Item> AdjustBalanceAsync(int id, int change);
  }
}
