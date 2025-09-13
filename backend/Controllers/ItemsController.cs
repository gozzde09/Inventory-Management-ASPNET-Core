using InventoryManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ItemsController : ControllerBase
  {
    private readonly ItemDbContext _context;

    public ItemsController(ItemDbContext context)
    {
      _context = context;
    }

    // CREATE - Add a new item
    [HttpPost]
    public async Task<ActionResult<Item>> CreateItem(Item item)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      // Validation: Check for duplicate names
      var existingItem = await _context.Items
          .FirstOrDefaultAsync(i => i.Name.ToLower() == item.Name.ToLower());

      if (existingItem != null)
      {
        return Conflict($"An item with name '{item.Name}' already exists.");
      }

      // Validation: Check thresholds
      if (item.CriticalStockThreshold > item.LowStockThreshold)
      {
        return BadRequest("Critical threshold cannot be higher than low stock threshold.");
      }

      await _context.AddAsync(item);
      await _context.SaveChangesAsync();

      return Created("", item); // 201
    }

    // READ - Get all items
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
    {
      var items = await _context.Items.AsNoTracking().ToListAsync();
      return Ok(items);
    }

    // UPDATE
    [HttpPut("{id:int}")]
    public async Task<IActionResult> EditItem(int id, Item item)
    {
      if (id != item.Id)
      {
        return BadRequest("Item ID mismatch");
      }
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var itemFromDb = await _context.Items.FindAsync(id);
      if (itemFromDb is null)
      {
        return NotFound($"Item with ID {id} not found.");
      }

      // Check for duplicate names (excluding current item)
      var duplicateItem = await _context.Items
          .FirstOrDefaultAsync(i => i.Name.ToLower() == item.Name.ToLower() && i.Id != id);

      if (duplicateItem != null)
      {
        return Conflict($"An item with name '{item.Name}' already exists.");
      }

      // Validation: Check thresholds
      if (item.CriticalStockThreshold > item.LowStockThreshold)
      {
        return BadRequest("Critical threshold cannot be higher than low stock threshold.");
      }

      // Update allowed fields
      itemFromDb.Name = item.Name;
      itemFromDb.Quantity = item.Quantity;
      itemFromDb.Unit = item.Unit;
      itemFromDb.LowStockThreshold = item.LowStockThreshold;
      itemFromDb.CriticalStockThreshold = item.CriticalStockThreshold;

      await _context.SaveChangesAsync();

      return Ok(itemFromDb);
    }

    // DELETE
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
      var item = await _context.Items.FindAsync(id);
      if (item is null)
      {
        return NotFound($"Item with ID {id} not found.");
      }

      _context.Items.Remove(item);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    // PATCH - Adjust stock balance
    [HttpPatch("{id:int}/adjust-balance")]
    public async Task<IActionResult> AdjustBalance(int id, [FromBody] int change)
    {
      var item = await _context.Items.FindAsync(id);
      if (item is null)
      {
        return NotFound($"Item with ID {id} not found.");
      }

      // Prevent negative stock
      int newBalance = item.Quantity + change;
      if (newBalance < 0)
      {
        return BadRequest($"Insufficient stock. Current: {item.Quantity}, Requested change: {change}");
      }

      item.Quantity = newBalance;
      await _context.SaveChangesAsync();

      return Ok(item);
    }
  }
}
