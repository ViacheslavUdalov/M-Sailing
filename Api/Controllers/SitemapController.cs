using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

// namespace Api.Controllers
// {
//     [Route("sitemap.xml")]
//     public class SitemapController : Controller
//     {
//         private readonly MainController _mainController;
//
//         public SitemapController(MainController mainController)
//         {
//             _mainController = mainController;
//         }
//
//         [HttpGet]
//         public async Task<IActionResult> Sitemap()
//         {
//             var urlset = new XElement("urlset",
//                 new XAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9"));
//
//             // Получаем данные о товарах с помощью MainController
//             var equipmentResult = await _mainController.GetAllEquipment(new ProductSpecParams());
//             var clothesResult = await _mainController.GetAllClothes(new ProductSpecParams());
//             var coversResult = await _mainController.GetAllCovers(new ProductSpecParams());
//             var armamentResult = await _mainController.GetAllArmament(new ProductSpecParams());
//             var boatsResult = await _mainController.GetAllBoats(new ProductSpecParams());
//
//             // Создаем ссылки на страницы товаров в карту сайта
//             AddProductUrls(urlset, equipmentResult?.Value?.Data);
//             AddProductUrls(urlset, clothesResult?.Value?.Data);
//             AddProductUrls(urlset, coversResult?.Value?.Data);
//             AddProductUrls(urlset, armamentResult?.Value?.Data);
//             AddProductUrls(urlset, boatsResult?.Value?.Data);
//
//             // Возвращаем XML как результат действия
//             var xml = new XDocument(new XDeclaration("1.0", "utf-8", "yes"), urlset);
//             return Content(xml.ToString(), "application/xml", Encoding.UTF8);
//         }
//
//         private void AddProductUrls(XElement urlset, IReadOnlyList<Product> products)
//         {
//             if (products != null)
//             {
//                 XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
//
//                 foreach (var product in products)
//                 {
//                     // Создание URL для каждого товара
//                     var url = Url.Action("GetOneEquipment", "Main", new { id = product.Id }, Request.Scheme);
//
//                     // Создание XML-элемента без установки префикса для пространства имен
//                     var urlElement = new XElement(ns + "url",
//                         new XElement(ns + "loc", url),
//                         new XElement(ns + "lastmod", DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:sszzz")),
//                         new XElement(ns + "changefreq", "monthly"),
//                         new XElement(ns + "priority", "0.8"));
//
//                     // Добавление элемента в карту сайта
//                     urlset.Add(urlElement);
//                 }
//             }
//         }
//
//     }
// }
