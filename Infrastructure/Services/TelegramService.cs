using Core.Interfaces;

namespace Infrastructure.Services;

public class TelegramService : ITelegramService
{
    private readonly HttpClient _httpClient;
    private readonly string _botToken;
    private readonly string _channelId;

    public TelegramService(HttpClient httpClient, string botToken, string channelId)
    {
        _httpClient = httpClient;
        _botToken = botToken;
        _channelId = channelId;
    }

    public async Task SendMessageAsync(string message)
    {
        var url = $"https://api.telegram.org/bot{_botToken}/sendMessage";
        var payload = new
        {
            chat_id = _channelId,
            text = message
        };
        var content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(payload), System.Text.Encoding.UTF8,
            "application/json");
        var response = await _httpClient.PostAsync(url, content);
        response.EnsureSuccessStatusCode();
    }
}