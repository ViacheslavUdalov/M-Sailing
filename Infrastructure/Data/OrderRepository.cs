using Core.Entities;
using Core.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Infrastructure.Data;

public class OrderRepository<T> : IOrderRepository<T> where T : BaseEntity
{
    private readonly IMongoDbContext _dbContext;

    public OrderRepository(IMongoDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }
    public async Task<T> GetByIdAsync(string collectionName, string id)
    {
        var collection = _dbContext.GetCollection<T>(collectionName);
        if (!ObjectId.TryParse(id, out ObjectId objectId))
        {
            Console.WriteLine($"Invalid ObjectId format: {id}");
            return null;
        }
        var filter = Builders<T>.Filter.Eq("_id", objectId);
            
        var cursor = await collection.FindAsync(filter);
        var result = await cursor.FirstOrDefaultAsync();
        if (result == null)
        {
            Console.WriteLine($"Document with id {id} not found in collection {collectionName}");
        }

        return result;
    }

    public async Task<IReadOnlyList<T>> GetAllAsync(string collectionName)
    {
        var collection = _dbContext.GetCollection<T>(collectionName);
        var result = await collection.Find(_ => true).ToListAsync();
        return result;
    }

    public async Task AddAsync(string collectionName, T entity)
    {  
        var collection = _dbContext.GetCollection<T>(collectionName);
        await collection.InsertOneAsync(entity);
    }
}