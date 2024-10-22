
namespace Core.Entities;

public class Product : BaseEntity
{
    public string Description { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string TypeForBuy { get; set; }
    public double Price { get; set; }
    public string Pictures { get; set; }
}