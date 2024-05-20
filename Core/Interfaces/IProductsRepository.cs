using Core.Specifications;

namespace Core.Interfaces;

public interface IProductsRepository<TEntity>
{
    Task<TEntity> GetByIdAsync(string collectionName, string id);
    Task<IReadOnlyList<TEntity>> GetAllAsync(string collectionName);
    Task<IReadOnlyList<TEntity>> ListWithSpecAsync(ISpecification<TEntity> specification, string collectionName);
    Task<int> CountAsync(ISpecification<TEntity> specification, string collectionName);
    Task AddAsync(string collectionName, TEntity entity);
    Task UpdateAsync(string collectionName, TEntity entity);
    Task DeleteAsync(string collectionName, TEntity entity);
}