

namespace Core.Entities;

public class Equipment : Product
{
    public string Description { get; set; }
  
    public string[]? Size { get; set; }
  
    public string[]? Colors { get; set; }

}