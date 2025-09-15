using InventoryManagement.Models;
using InventoryManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ItemsController : ControllerBase
  {
    private readonly IItemService _itemService;

    public ItemsController(IItemService itemService)
    {
      _itemService = itemService;
    }

    // CREATE - Add a new item
    [HttpPost]
    public async Task<ActionResult<Item>> CreateItem(Item item)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      try
      {
        var createdItem = await _itemService.CreateItemAsync(item);
        return Created("", createdItem); // 201
      }
      catch (InvalidOperationException ex)
      {
        return Conflict(ex.Message);
      }
    }

    // READ - Get all items
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
    {
      var items = await _itemService.GetItemsAsync();
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

      try
      {
        var updatedItem = await _itemService.EditItemAsync(id, item);
        return Ok(updatedItem);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
      catch (InvalidOperationException ex)
      {
        return Conflict(ex.Message);
      }
    }

    // DELETE
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
      try
      {
        await _itemService.DeleteItemAsync(id);
        return NoContent();
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
    }

    // PATCH - Adjust stock balance
    [HttpPatch("{id:int}/adjust-balance")]
    public async Task<IActionResult> AdjustBalance(int id, [FromBody] int change)
    {
      try
      {
        var updatedItem = await _itemService.AdjustBalanceAsync(id, change);
        return Ok(updatedItem);
      }
      catch (KeyNotFoundException ex)
      {
        return NotFound(ex.Message);
      }
      catch (InvalidOperationException ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
