namespace Core.Entities;

public class ProductToCreateOrder
{
    public string Name { get; set; }
    public double Price { get; set; }
    public string? Size { get; set; }
    public string Pictures { get; set; }
    public int Quantity { get; set; }
    
}