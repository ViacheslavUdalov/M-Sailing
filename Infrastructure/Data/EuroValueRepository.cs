using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class EuroValueRepository : IEuroValueRepository
{
    private readonly StoreContext _context;

    public EuroValueRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<EuroValue> GetEuroCurrency()
    {
        return await _context.EuroValue.FirstOrDefaultAsync();
    }

    public async Task<EuroValue> UpdateEuroValue(int value)
    {
        var euro = await _context.EuroValue.FirstOrDefaultAsync();
        if (euro != null)
        {
            euro.EuroCurrency = value;
            await _context.SaveChangesAsync();
        }

        return euro;
    }

}