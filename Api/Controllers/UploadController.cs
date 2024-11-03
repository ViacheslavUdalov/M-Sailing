using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class UploadController : BaseApiController
{
    [HttpPost("uploadimage")]
    public async Task<IActionResult> UpdateProductImage([FromForm] IFormFile image)
    {
        if (image == null || image.Length == 0)
        {
            return BadRequest("Файл не загружен или пуст.");
        }

        // Путь для сохранения файла
        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Content", "assets", "productsimages");
        var fileName = image.FileName; 
        var filePath = Path.Combine(uploadsFolder, fileName);

        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        var fileUrl = $"assets/productsimages/{fileName}";

        return Ok(new { fileUrl });
    }

}