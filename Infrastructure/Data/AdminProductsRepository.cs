using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class AdminProductsRepository : IAdminProductsRepository
{
    public Task<Equipment> CreateEq(Equipment equipment)
    {
        throw new NotImplementedException();
    }

    public Task<Armament> CreateAr(Armament armament)
    {
        throw new NotImplementedException();
    }

    public Task<Covers> CreateCo(Covers covers)
    {
        throw new NotImplementedException();
    }

    public Task<Boats> CreateBoat(Boats boats)
    {
        throw new NotImplementedException();
    }

    public Task<Equipment> UpdateEq(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Armament> UpdateAr(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Covers> UpdateCo(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Boats> UpdateBoat(int id)
    {
        throw new NotImplementedException();
    }

    public void DeleteEq(int id)
    {
        throw new NotImplementedException();
    }

    public void DeleteAr(int id)
    {
        throw new NotImplementedException();
    }

    public void DeleteCo(int id)
    {
        throw new NotImplementedException();
    }

    public void DeleteBoat(int id)
    {
        throw new NotImplementedException();
    }
}