using Core.Entities;

namespace Core.Specifications;

public class ProductsWithFiltersCountSpec<T> : BaseSpecification<T> where T : Product
{
    public ProductsWithFiltersCountSpec(ProductSpecParams productSpecParams)
        : base(x =>
            (string.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Trim().Contains(productSpecParams.Search.ToLower().Trim())) &&
            (string.IsNullOrEmpty(productSpecParams.TypeForBuy) || x.TypeForBuy  == productSpecParams.TypeForBuy) &&
            (string.IsNullOrEmpty(productSpecParams.Type) || x.Type == productSpecParams.Type )
        )
    {
        
    }
}