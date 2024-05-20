using Core.Entities;
using MongoDB.Driver.Linq;

namespace Core.Specifications;

public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
{
 public static IMongoQueryable<TEntity> GetQuery(IMongoQueryable<TEntity> inputQuery, ISpecification<TEntity> specification)
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