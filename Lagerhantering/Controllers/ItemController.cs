using InventoryManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
  public class ItemController : Controller
  {
    private readonly ItemContext _context;

    public ItemController(ItemContext context)
    {
      _context = context;
    }

    public IActionResult Index()
    {
      List<Item> items = _context.Items.ToList();
      return View(items);
    }
  }
}