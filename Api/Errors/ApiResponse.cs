namespace Api.Errors;

public class ApiResponse
{
    public ApiResponse(int statusCode, string message = null)
    {
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }

   

    public int StatusCode { get; set; }
    public string Message { get; set; }
    private string? GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "Не верный запрос",
            401 => "Не удалось авторизоваться",
            404 => "Не найдено",
            500 =>
                "Ошибка сервера",
            _ => null
        };
    }
}