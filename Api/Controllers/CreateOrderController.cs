using System.Text;
using Core.Entities;
using Core.Interfaces;
using DefaultNamespace;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers;

public class CreateOrderController : BaseApiController
{
    private readonly IOrderRepository<CreateOrderData> _orderRepository;
    private readonly IEmailService _emailService;
    private readonly ITelegramService _telegramService;

    public CreateOrderController(IOrderRepository<CreateOrderData> orderRepository, 
        IEmailService emailService,
        ITelegramService telegramService)
    {
        _orderRepository = orderRepository;
        _emailService = emailService;
        _telegramService = telegramService;
    }
    [HttpPost("create-order")]
    public async Task<ActionResult<CreateOrderData>> CreateOrderAsync(CreateOrderData createOrderData)
    {
        if (createOrderData == null)
        {
            return BadRequest("Товар не найден.");
        }
        createOrderData.GetPrice();
        await _orderRepository.AddAsync(createOrderData);
        await _emailService.SendEmail(createOrderData);
        var message = FormatOrderMessage(createOrderData);
        await _telegramService.SendMessageAsync(message);
        return Ok(createOrderData);
    }
    private string FormatOrderMessage(CreateOrderData order)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"📦 Новый заказ:");
        sb.AppendLine($"Номер Заказа: {order.Id}");
        sb.AppendLine($"Телефон: {order.PhoneNumber}");
        sb.AppendLine($"Адрес: {order.Address.Region} {order.Address.City}" +
                      $" {order.Address.Street} {order.Address.House} {order.Address?.Corpus}");
        sb.AppendLine($"Получатель: {order.NameOfGetter}");
        sb.AppendLine($"Дата заказа: {order.OrderDate}");
        sb.AppendLine($"Продукты:");
        foreach (var product in order.ProductToCreateOrder)
        {
            sb.AppendLine($"- {product.Name}: {$"Размер - "} {product?.Size} {product.Quantity} x {product.Price} = {product.Quantity * product.Price}");
        }
        sb.AppendLine($"💵 Общая сумма: {order.TotalPrice}");

        return sb.ToString();
    }
   
}