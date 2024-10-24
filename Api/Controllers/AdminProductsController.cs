using Core.Entities;
using Core.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
public class AdminProductsController : BaseApiController
{
    private readonly IAdminProductsRepository _adminProductsRepository;

    public AdminProductsController(IAdminProductsRepository adminProductsRepository)
    {
        _adminProductsRepository = adminProductsRepository;
    }
    
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("create-equip")]
    public async Task<ActionResult<Equipment>> CreateEquip(Equipment equipment)
    {
        var equip = await _adminProductsRepository.CreateEq(equipment);
        if (equip == null)
        {
            return BadRequest("Не найдены данные.");
        }
        return Ok(equip);
    }
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut("update-equip/{id}")]
    public async Task<ActionResult<Equipment>> UpdateEquip(Equipment equipment)
    {
        Console.WriteLine(equipment);
        var equip = await _adminProductsRepository.UpdateEq(equipment.Id, equipment);
        if (equip == null)
        {
            return BadRequest("Не найдены данные.");
        }
        
        return Ok(equip);
    }
    
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("delete-equip/{id}")]
    public async Task<ActionResult> DeleteEquip(int id)
    {
       var success = await _adminProductsRepository.DeleteEq(id);

       if (!success)
       {
           return NotFound("Товар не найден, Удаление не выполнено.");
       }
       
       return Ok("Данные удалены.");
    }
}