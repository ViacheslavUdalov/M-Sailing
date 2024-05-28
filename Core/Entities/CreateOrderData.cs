namespace Core.Entities;

public class CreateOrderData : BaseEntity
{
    public string PhoneNumber { get; set; }
    public Address Address { get; set; }
    public string NameOfGetter { get; set; }
    public List<ProductToCreateOrder> Products { get; set; }
    public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.UtcNow;
    public decimal  TotalPrice { get; set; }
    public void GetPrice()
    {
        TotalPrice = Products.Sum(p => p.Price * p.Quantity);
    }
}