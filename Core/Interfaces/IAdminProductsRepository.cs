using Core.Entities;

namespace Core.Interfaces;

public interface IAdminProductsRepository
{
    Task<Equipment> CreateEq(Equipment equipment);
    Task<Armament> CreateAr(Armament armament);
    Task<Covers> CreateCo(Covers covers);
    Task<Boats> CreateBoat(Boats boats);
    Task<Equipment> UpdateEq(Equipment equipment);
    Task<Armament> UpdateAr(Armament armament);
    Task<Covers> UpdateCo(Covers covers);
    Task<Boats> UpdateBoat(Boats boats);
    Task<bool> DeleteEq(int id);
    Task<bool> DeleteAr(int id);
    Task<bool> DeleteCo(int id);
    Task<bool> DeleteBoat(int id);
}