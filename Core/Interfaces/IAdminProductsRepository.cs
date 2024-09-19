using Core.Entities;

namespace Core.Interfaces;

public interface IAdminProductsRepository
{
    Task<Equipment> CreateEq(Equipment equipment);
    Task<Armament> CreateAr(Armament armament);
    Task<Covers> CreateCo(Covers covers);
    Task<Boats> CreateBoat(Boats boats);
    Task<Equipment> UpdateEq(int id);
    Task<Armament> UpdateAr(int id);
    Task<Covers> UpdateCo(int id);
    Task<Boats> UpdateBoat(int id);
    void DeleteEq(int id);
    void DeleteAr(int id);
    void DeleteCo(int id);
    void DeleteBoat(int id);
}