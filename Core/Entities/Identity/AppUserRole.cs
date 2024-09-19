using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class AppUserRole : IdentityUserRole<int>
{
    public AppUser AppUser { get; set; }
    public AppRole AppRole { get; set; }

}