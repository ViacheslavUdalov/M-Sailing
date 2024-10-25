namespace Core.Interfaces;

public interface IOrderRepository<TEntity>
{
    Task<TEntity> GetByIdAsync(string id);
    Task<IReadOnlyList<TEntity>> GetAllAsync();
    Task AddAsync(TEntity entity);
    Task UpdateProductQuantity(int productId, string productType, int newQuantity, string? size);
}