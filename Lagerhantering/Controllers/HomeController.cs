using InventoryManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
    public IActionResult Inventory()
    {
      using (ItemDbContext db = new ItemDbContext())
      {
        List<Item> itemsList = db.Items.ToList();
        return View(itemsList);
      }
    }
  }
}
