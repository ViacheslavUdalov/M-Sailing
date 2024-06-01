namespace Core.Interfaces;

public interface IOrderRepository<TEntity>
{
    Task<TEntity> GetByIdAsync(string id);
    Task<IReadOnlyList<TEntity>> GetAllAsync();
    Task AddAsync(TEntity entity);
}