using Core.Entities;

namespace Core.Specifications;

public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
{
 public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> specification)
 {
  var query = inputQuery;
  if (specification.Criteria != null)
  {
   query = query.Where(specification.Criteria);
  }

  if (specification.OrderBy != null)
  {
   query = query.OrderBy(specification.OrderBy);
  }
  if (specification.OrderByDescending != null)
  {
   query = query.OrderByDescending(specification.OrderByDescending);
  }
  if (specification.isPagingEnabled)
  {
   query = query.Skip(specification.Skip).Take(specification.Take);
  }

  return query;
 }
}