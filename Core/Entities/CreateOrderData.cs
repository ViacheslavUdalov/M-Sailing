namespace Core.Entities;

public class CreateOrderData : BaseEntity
{
    public string PhoneNumber { get; set; }
    public Address Address { get; set; }
    public string NameOfGetter { get; set; }
    public List<ProductToCreateOrder> ProductToCreateOrder { get; set; }
    public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.UtcNow;
    public double  TotalPrice { get; set; }
    public void GetPrice()
    {
        TotalPrice = ProductToCreateOrder.Sum(p => p.Price * p.Quantity);
    }
}