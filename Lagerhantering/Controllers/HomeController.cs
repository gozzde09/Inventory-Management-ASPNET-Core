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
      return View();
    }
  }
}
