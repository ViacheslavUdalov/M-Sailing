using Core.Entities.Identity;
using Core.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto logindto)
    {
        var user = await _userManager.Users
            .SingleOrDefaultAsync(x => x.Email == logindto.Email.ToLower());
        if (user == null) return Unauthorized("Неверное имя пользователя.");

        var result = await _signInManager.CheckPasswordSignInAsync(user, logindto.Password, false);
        if (!result.Succeeded) return Unauthorized();
        
        Console.WriteLine(new UserDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user),
            PhotoUrl = user.PhotoUrl
        });
        
        return new UserDto
        {
            UserName = user.UserName,
            Token = await _tokenService.CreateToken(user),
            PhotoUrl = user.PhotoUrl
        };
    }
}