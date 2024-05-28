using System.Net;
using System.Net.Mail;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly string _emailFrom;
    private readonly string _smtpServer;
    private readonly int _port;
    private readonly string _username;
    private readonly string _password;
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _emailFrom = configuration["EmailSettings:EmailFrom"];
        _smtpServer = configuration["EmailSettings:SmtpServer"];
        _port = int.Parse(configuration["EmailSettings:Port"]);
        _username = configuration["EmailSettings:Username"];
        _password = configuration["EmailSettings:Password"];
    }
    public async Task SendEmail(CreateOrderData createOrderData)
    {
        try
        {
            string emailBody = GenerateEmailBody(createOrderData);
            using (var smtpClient = new SmtpClient())
            {
                smtpClient.Host = _smtpServer;
                smtpClient.Port = _port;
                smtpClient.Credentials = new NetworkCredential(_username, _password);
                smtpClient.EnableSsl = true;

                var mailMessage = new MailMessage(_emailFrom, "slavataser@mail.ru", createOrderData.Id.ToString(),
                    emailBody);
                mailMessage.IsBodyHtml = true;
                smtpClient.Send(mailMessage);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    private string GenerateEmailBody(CreateOrderData createOrderData)
    {
        string emailBody = @"
        <html>
        <body>
        <h1>Данные заказа<h1>
        <p>Покупатель: " + createOrderData.NameOfGetter + @"</p>
  <p>Номер Телефона: " + createOrderData.PhoneNumber + @"</p>
                <p>Дата заказа: " + createOrderData.OrderDate.ToString("dd/MM/yyyy HH:mm:ss") + @"</p>
                <p>Адрес доставки: " + createOrderData.Address.City + createOrderData.Address.Region + createOrderData.Address.Street + 
                           createOrderData.Address.House + createOrderData.Address.Corpus +@"</p>
                <p>Товары:</p>
                <ul>";
        foreach (var item in createOrderData.Products)
        {
            emailBody += "<li>" + item.Price + item.Name +"</li>";
            emailBody += $"<img src=\"{item.Pictures}\" alt=\"{item.Name}\" />";
            emailBody += "<li>" + item.Quantity +"</li>";
        }

        emailBody += @"
        </ul>
        <p>Общая сумма: " + createOrderData.TotalPrice.ToString() + @"</p>
            </body>
            </html>";
        return emailBody;
    }
}