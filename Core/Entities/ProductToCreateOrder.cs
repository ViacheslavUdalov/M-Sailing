namespace Core.Entities;

public class ProductToCreateOrder
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string? Size { get; set; }
    public string Pictures { get; set; }
    public int Quantity { get; set; }
    public string Type { get; set; }
}