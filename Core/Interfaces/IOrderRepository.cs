namespace Core.Interfaces;

public interface IOrderRepository<TEntity>
{
    Task<TEntity> GetByIdAsync(string collectionName, string id);
    Task<IReadOnlyList<TEntity>> GetAllAsync(string collectionName);
    Task AddAsync(string collectionName, TEntity entity);
}