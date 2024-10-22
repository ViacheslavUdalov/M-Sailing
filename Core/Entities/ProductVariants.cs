namespace Core.Entities;

public class ProductVariants
{
    public int Id { get; set; }
    public string Size { get; set; }
    public int Quantity { get; set; }
    public int ProductId { get; set; }
}