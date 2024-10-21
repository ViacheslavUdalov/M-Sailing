using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AdminSeed
{
    public static async Task SeedAdmin(UserManager<AppUser> userManager, 
        RoleManager<AppRole> roleManager)
    {
        var users = await userManager.Users.ToListAsync();
        if (users.Any()) return;

        var roles = new List<AppRole>
        {
            new AppRole { Name = "Admin" }
        };
        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        var admin = new AppUser
        {
            DisplayName = "Admin",
            Email = "slava187115@mail.ru",
            UserName = "Admin",
            PhotoUrl = "assets/productsimages/msailing.jpg",
            SecurityStamp = Guid.NewGuid().ToString()
        };
        var result = await userManager.CreateAsync(admin, "M-sailing115!");
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                Console.WriteLine("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                Console.WriteLine(error.Description);
            }
        }

      
        await userManager.AddToRolesAsync(admin, new[] {"Admin"});
    }
}