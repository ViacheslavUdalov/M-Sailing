using Core.Entities;

namespace Core.Specifications;

public class RandomSpec : BaseSpecification<Product>
{
    public RandomSpec(int skip, int count) : base(e => true)
    {
        ApplyPaging(skip, count);
    }
}