using Core.Entities;

namespace Core.Interfaces;

public interface IEmailService
{
    Task SendEmail(CreateOrderData createOrderData);
}