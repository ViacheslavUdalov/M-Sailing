

namespace Core.Entities;

public class Equipment : Product
{
    public ICollection<ProductVariants> ProductVariants { get; set; }
   
}