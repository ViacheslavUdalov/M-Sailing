using Core.Entities;

namespace Core.Interfaces;

public interface IEuroValueRepository
{
    public Task<EuroValue> GetEuroCurrency();
    public Task<EuroValue> UpdateEuroValue(int value);
}