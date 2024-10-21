using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class AppUser : IdentityUser<int>
{
    public string DisplayName { get; set; }
    public string PhotoUrl { get; set; }
    public ICollection<AppUserRole> UserRoles { get; set; }
}
