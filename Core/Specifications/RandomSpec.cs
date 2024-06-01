using Core.Entities;

namespace Core.Specifications;

public class RandomSpec<T> : BaseSpecification<T> where T : Product
{
    public RandomSpec(int skip, int count) : base(e => true)
    {
        ApplyPaging(skip, count);
    }
}