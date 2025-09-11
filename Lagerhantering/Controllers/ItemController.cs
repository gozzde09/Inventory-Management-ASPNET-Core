using InventoryManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
  public class ItemController : Controller
  {
    public IActionResult Index()
    {
      using (ItemDbContext db = new ItemDbContext())
      {
        List<Item> itemsList = db.Items.ToList();
        return View(itemsList);
      }
    }
  }
}