namespace Core.Specifications;

public class ProductSpecParams
{
    private const int MaxPageSize = 30;
    public int PageIndex { get; set; } = 1;
    private int _pageSize = 30;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    public string? Type { get; set; }
    public string? TypeForBuy { get; set; }
   

  
    public string? Sort { get; set; }
    private string? _search { get; set; } = "";

    public string? Search
    {
        get => _search;
        set => _search = value.ToLower();
    }
}