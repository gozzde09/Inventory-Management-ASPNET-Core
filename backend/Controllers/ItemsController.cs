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

    // CREATE
    [HttpPost]
    public async Task<IActionResult> CreateItem(Item item)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      await _context.AddAsync(item);
      var result = await _context.SaveChangesAsync();
      if (result > 0)
      {
        return Ok("Item created");
      }
      return BadRequest("Failed to create item");
    }

    // READ
    [HttpGet]
    public async Task<IEnumerable<Item>> GetItems()
    {
      var items = await _context.Items.AsNoTracking().ToListAsync();
      return items;
    }

    // UPDATE
    [HttpPut("{id:int}")]
    public async Task<IActionResult> EditItem(int id, Item item)
    {
      var itemFromDb = await _context.Items.FindAsync(id);
      if (itemFromDb is null)
      {
        return BadRequest("Item not found");
      }

      itemFromDb.Name = item.Name;
      itemFromDb.Quantity = item.Quantity;
      itemFromDb.Unit = item.Unit;

      var result = await _context.SaveChangesAsync();
      if (result > 0)
      {
        return Ok("Item updated");
      }
      return BadRequest("Failed to update item");
    }

    // DELETE
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
      var item = await _context.Items.FindAsync(id);
      if (item is null)
      {
        return NotFound();
      }
      _context.Remove(item);

      var result = await _context.SaveChangesAsync();
      if (result > 0)
      {
        return Ok("Item deleted");
      }
      return BadRequest("Failed to delete item");
    }
  }
}
