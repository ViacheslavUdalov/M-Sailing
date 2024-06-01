using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly StoreContext _context;

        public ProductsRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Equipment> GetEquipByIdAsync(int id)
        {
            return await _context.Equipment.FindAsync(id);
        }

        public async Task<Armament> GetArmamByIdAsync(int id)
        {
            return await _context.Armament.FindAsync(id);
        }

        public async Task<Covers> GetCoversByIdAsync(int id)
        {
            return await _context.Covers.FindAsync(id);
        }

        public async Task<Clothes> GetClothesByIdAsync(int id)
        {
            return await _context.Clothes.FindAsync(id);
        }

        public async Task<Boats> GetBoatsByIdAsync(int id)
        {
            return await _context.Boats.FindAsync(id);
        }

        public async Task<IReadOnlyList<Equipment>> ListEquipWithSpecAsync(ISpecification<Equipment> specification)
        {
            return await ApplySpecification(specification, _context.Equipment).ToListAsync();
        }

        public async Task<IReadOnlyList<Armament>> ListArmamWithSpecAsync(ISpecification<Armament> specification)
        {
            return await ApplySpecification(specification, _context.Armament).ToListAsync();
        }

        public async Task<IReadOnlyList<Clothes>> ListClothesWithSpecAsync(ISpecification<Clothes> specification)
        {
            return await ApplySpecification(specification, _context.Clothes).ToListAsync();
        }

        public async Task<IReadOnlyList<Covers>> ListCoversWithSpecAsync(ISpecification<Covers> specification)
        {
            return await ApplySpecification(specification, _context.Covers).ToListAsync();
        }

        public async Task<IReadOnlyList<Boats>> ListBoatsWithSpecAsync(ISpecification<Boats> specification)
        {
            return await ApplySpecification(specification, _context.Boats).ToListAsync();
        }

        public async Task<int> CountEquipAsync(ISpecification<Equipment> specification)
        {
            return await ApplySpecification(specification, _context.Equipment).CountAsync();
        }

        public async Task<int> CountArmamAsync(ISpecification<Armament> specification)
        {
            return await ApplySpecification(specification, _context.Armament).CountAsync();
        }

        public async Task<int> CountClothesAsync(ISpecification<Clothes> specification)
        {
            return await ApplySpecification(specification, _context.Clothes).CountAsync();
        }

        public async Task<int> CountCoversAsync(ISpecification<Covers> specification)
        {
            return await ApplySpecification(specification, _context.Covers).CountAsync();
        }

        public async Task<int> CountBoatsAsync(ISpecification<Boats> specification)
        {
            return await ApplySpecification(specification, _context.Boats).CountAsync();
        }

        private IQueryable<T> ApplySpecification<T>(ISpecification<T> specification, DbSet<T> dbSet) where T : BaseEntity
        {
            return SpecificationEvaluator<T>.GetQuery(dbSet.AsQueryable(), specification);
        }
    }
}
