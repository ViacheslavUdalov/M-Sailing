using MongoDB.Driver;

namespace Core.Interfaces;

public interface IMongoDbContext
{
  IMongoCollection<TEntity> GetCollection<TEntity>(string name);
}