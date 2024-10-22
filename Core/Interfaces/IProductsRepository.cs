using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces;

public interface IProductsRepository
{
    Task<Equipment> GetEquipByIdAsync(int id);
    Task<Armament> GetArmamByIdAsync(int id);
    Task<Covers> GetCoversByIdAsync(int id);
    Task<Boats> GetBoatsByIdAsync(int id);
    Task<IReadOnlyList<Equipment>> ListEquipWithSpecAsync(ISpecification<Equipment> specification);
    Task<IReadOnlyList<Armament>> ListArmamWithSpecAsync(ISpecification<Armament> specification);
    Task<IReadOnlyList<Covers>> ListCoversWithSpecAsync(ISpecification<Covers> specification);
    Task<IReadOnlyList<Boats>> ListBoatsWithSpecAsync(ISpecification<Boats> specification);
    Task<int> CountEquipAsync(ISpecification<Equipment> specification);
    Task<int> CountArmamAsync(ISpecification<Armament> specification);
    Task<int> CountCoversAsync(ISpecification<Covers> specification);
    Task<int> CountBoatsAsync(ISpecification<Boats> specification);
    
}