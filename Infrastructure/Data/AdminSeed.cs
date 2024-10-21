using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AdminSeed
{
    public static async Task SeedAdmin(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
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
            Email = "slava187115@mail.ru",
            DisplayName = "Admin",

        };
        await userManager.CreateAsync(admin, "M-sailing");
        await userManager.AddToRoleAsync(admin, "Admin");
    }
}