using Core.Entities;

namespace Core.Interfaces;

public interface IAdminProductsRepository
{
    Task<Equipment> CreateEq(Equipment equipment);
    Task<Armament> CreateAr(Armament armament);
    Task<Boats> CreateBoat(Boats boats);
    Task<Equipment> UpdateEq(int Id, Equipment equipment);
    Task<Armament> UpdateArmam(int Id, Armament armament);
    Task<Boats> UpdateBoat(Boats boats);
    Task<bool> DeleteEq(int id);
    Task<bool> DeleteAr(int id);
    Task<bool> DeleteCo(int id);
    Task<bool> DeleteBoat(int id);
}