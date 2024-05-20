using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Infrastructure.Data
{
    public class ProductsRepository<T> : IProductsRepository<T> where T : BaseEntity
    {
        private readonly IMongoDbContext _dbContext;

        public ProductsRepository(IMongoDbContext dbContext)
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

        public async Task<IReadOnlyList<T>> ListWithSpecAsync(ISpecification<T> specification, string collectionName)
        {
            return await ApplySpecification(specification, collectionName).ToListAsync();
        }

        public async Task<int> CountAsync(ISpecification<T> specification, string collectionName)
        {
            return await ApplySpecification(specification, collectionName).CountAsync();
        }

        public async Task AddAsync(string collectionName, T entity)
        {
            var collection = _dbContext.GetCollection<T>(collectionName);
            throw new NotImplementedException();
        }

        public async Task UpdateAsync(string collectionName, T entity)
        {
            var collection = _dbContext.GetCollection<T>(collectionName);
            throw new NotImplementedException();
        }

        public async Task DeleteAsync(string collectionName, T entity)
        {
            var collection = _dbContext.GetCollection<T>(collectionName);
            throw new NotImplementedException();
        }

        private IMongoQueryable<T> ApplySpecification(ISpecification<T> specification, string collectionName)
        {
            return SpecificationEvaluator<T>.GetQuery(_dbContext.GetCollection<T>(collectionName).AsQueryable(), specification);
        }
    }
}