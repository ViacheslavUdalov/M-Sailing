using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class ProductsWithFilterSpec : BaseSpecification<Product>
{
    public ProductsWithFilterSpec(ProductSpecParams productSpecParams)
        : base(x =>
            (string.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Trim().Contains(productSpecParams.Search.ToLower().Trim())) &&
            (string.IsNullOrEmpty(productSpecParams.TypeForBuy) || x.TypeForBuy  == productSpecParams.TypeForBuy) &&
            (string.IsNullOrEmpty(productSpecParams.Type) || x.Type  == productSpecParams.Type)
            )
    {
        ApplyPaging(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);
        if (!string.IsNullOrEmpty(productSpecParams.Sort))
        {
            switch (productSpecParams.Sort) 
            {
                case "priceAsc":
                    AddOrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(p => p.Price);
                    break;
                default:
                    AddOrderBy(n => n.Name);
                    break;
            }
        }
        
    }
}