namespace Core.Entities;

public class ProductToCreateOrder : BaseEntity
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string? Size { get; set; }
    public string? Color { get; set; }
    public string Pictures { get; set; }
    public int Quantity { get; set; }
}