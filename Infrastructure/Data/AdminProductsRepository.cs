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
    

    public Task<Boats> CreateBoat(Boats boats)
    {
        throw new NotImplementedException();
    }

    public async Task<Equipment> UpdateEq(int Id, Equipment equip)
    {
       var equipment = await _context.Equipment.Include(p => p.ProductVariants).FirstOrDefaultAsync(e => e.Id == Id);

       if (equipment == null)
       {
           return null;
       }

       var trackedEntity = _context.Set<Equipment>().Local.FirstOrDefault(e => e.Id == Id);
       if (trackedEntity != null)
       {
           _context.Entry(trackedEntity).CurrentValues.SetValues(equip);
           //Этот вызов берёт все значения из updatedEquipment и копирует их в существующий объект existingEquipment.
           //Entity Framework Core автоматически пометит изменённые поля и обновит их при сохранении.
           foreach (var variant in equip.ProductVariants)
           {
               var existingVariant = equipment.ProductVariants.FirstOrDefault(v => v.Id == variant.Id);
               if (existingVariant != null)
               {
                   _context.Entry(existingVariant).CurrentValues.SetValues(variant);
               }
               else
               {
                   equipment.ProductVariants.Add(variant);
               }
           }
           var variantsToRemove = equipment.ProductVariants
               .Where(v => !equip.ProductVariants.Any(uv => uv.Id == v.Id))
               .ToList();
           foreach (var variantToRemove in variantsToRemove)
           {
               _context.ProductVariants.Remove(variantToRemove);
           }
       }

    
       else
       {
           _context.Set<Equipment>().Attach(equip);
           _context.Entry(equip).State = EntityState.Modified;
       }
           
        await _context.SaveChangesAsync();
        return equip;
    }

    public Task<Armament> UpdateAr(Armament armament)
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