using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class OrderRepository<T> : IOrderRepository<T> where T : BaseEntity
{
    private readonly StoreContext _context;

    public OrderRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<T> GetByIdAsync(string id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task AddAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProductQuantity(int productId, string productType, int newQuantity, string? size = null)
    {
        // var product = await _context.Set<T>()
        //     .Include("ProductVariants")
        //     .FirstOrDefaultAsync(p => p.Id == productId);

        if (productType == "Equipment")
        {
            await UpdateEquipmentQuantity(productId, newQuantity, size);
        } else if (productType == "Armament")
        {
            await UpdateArmamentQuantity(productId, newQuantity);
        }
        else
        {
            throw new InvalidOperationException("Неподдерживаемый тип продукта");
        }

        await _context.SaveChangesAsync();
        
    }
    private async Task UpdateEquipmentQuantity(int productId, int newQuantity, string? size)
    {
        var product = await _context.Equipment.Include("ProductVariants")
            .FirstOrDefaultAsync(p => p.Id == productId);

        if (product != null)
        {
            if (size != null)
            {
                var variant = product.ProductVariants.FirstOrDefault(v => v.Size == size);
                if (variant != null)
                {
                    if (variant.Quantity >= newQuantity)
                    {
                        variant.Quantity -= newQuantity;
                    }
                    else
                    {
                        throw new InvalidOperationException(
                            $"Недостаточно товара размера {size}, в наличии есть - {variant.Quantity}");
                    }
                }
            }
        

            await _context.SaveChangesAsync();
        }
    }

    private async Task UpdateArmamentQuantity(int productId, int newQuantity)
    {
        var product = await _context.Armament.FirstOrDefaultAsync(p => p.Id == productId);

        if (product != null)
        {
            if (product.Quantity >= newQuantity)
            {
                product.Quantity -= newQuantity;
            }
            else
            {
                throw new InvalidOperationException("Недостаточное количество товара.");
            }

            await _context.SaveChangesAsync();
        }
    }
}

