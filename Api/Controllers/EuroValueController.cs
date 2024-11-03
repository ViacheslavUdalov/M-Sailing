using Core.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;
[Authorize]
public class EuroValueController : BaseApiController
{
    private IEuroValueRepository _euroValueRepository;

    public EuroValueController(IEuroValueRepository euroValueRepository)
    {
        _euroValueRepository = euroValueRepository;
    }

    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut("updateeuro/{updatedValue}")]
    public async Task<ActionResult<int>> UpdateEuroValue(int updatedValue)
    {
        if (updatedValue == null)
        {
            return BadRequest("Нет обновлённого значения");
        }
        var euro = await _euroValueRepository.UpdateEuroValue(updatedValue);
        return Ok(euro.EuroCurrency);
    }

}