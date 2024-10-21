using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AdminProductsRepository : IAdminProductsRepository
{
    
    private readonly StoreContext _context;

    public AdminProductsRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<Equipment> CreateEq(Equipment equipment)
    {
        await _context.Equipment.AddAsync(equipment);
        await _context.SaveChangesAsync();
        return equipment;
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

    public async Task<Equipment> UpdateEq(Equipment equip)
    {
       var equipment = await _context.Equipment.FirstOrDefaultAsync(e => e.Id == equip.Id);

       if (equipment == null)
       {
           return null;
       }
       
       _context.Entry(equip).CurrentValues.SetValues(equipment);
           //Этот вызов берёт все значения из updatedEquipment и копирует их в существующий объект existingEquipment.
           //Entity Framework Core автоматически пометит изменённые поля и обновит их при сохранении.
           
        await _context.SaveChangesAsync();
        return equipment;
    }

    public Task<Armament> UpdateAr(Armament armament)
    {
        throw new NotImplementedException();
    }

    public Task<Covers> UpdateCo(Covers covers)
    {
        throw new NotImplementedException();
    }

    public Task<Boats> UpdateBoat(Boats boats)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteEq(int id)
    {
        var equip = await _context.Equipment.FirstOrDefaultAsync(e => e.Id == id);
        if (equip == null)
        {
            return false;
        }

        _context.Equipment.Remove(equip);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAr(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteCo(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteBoat(int id)
    {
        throw new NotImplementedException();
    }
}