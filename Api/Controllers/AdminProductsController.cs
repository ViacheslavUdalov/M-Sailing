using Api.Helpers;
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
    private readonly UrlResolver _urlResolver;

    public AdminProductsController(IAdminProductsRepository adminProductsRepository,
        UrlResolver urlResolver)
    {
        _adminProductsRepository = adminProductsRepository;
        _urlResolver = urlResolver;
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
        equipment.Pictures = _urlResolver.DeleteApiUrl(equipment.Pictures);
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
    
    
    
    
    
    
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("create-armam")]
    public async Task<ActionResult<Armament>> CreateArmam(Armament armament)
    {
        var armam = await _adminProductsRepository.CreateAr(armament);
        if (armam == null)
        {
            return BadRequest("Не найдены данные.");
        }
        return Ok(armam);
    }
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut("update-armam/{id}")]
    public async Task<ActionResult<Armament>> UpdateArmam(Armament armament)
    {
        Console.WriteLine(armament);
        armament.Pictures = _urlResolver.DeleteApiUrl(armament.Pictures);
        var armam = await _adminProductsRepository.UpdateArmam(armament.Id, armament);
        if (armam == null)
        {
            return BadRequest("Не найдены данные.");
        }
        
        return Ok(armam);
    }
    
    
    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("delete-armam/{id}")]
    public async Task<ActionResult> DeleteArmam(int id)
    {
        var success = await _adminProductsRepository.DeleteAr(id);

        if (!success)
        {
            return NotFound("Товар не найден, Удаление не выполнено.");
        }
       
        return Ok("Данные удалены.");
    }
}