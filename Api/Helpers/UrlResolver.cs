using Core.Entities;

namespace Api.Helpers;

public class UrlResolver
{
    private readonly IConfiguration _configuration;

    public UrlResolver(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string Resolve(string source)
    {
        string fullUrl = "";
        if (!string.IsNullOrEmpty(source) && !source.Contains(_configuration["ApiUrl"]))
        {
            fullUrl = _configuration["ApiUrl"] + source;
        }

        // Console.WriteLine(urls);
        return fullUrl;
    }

    public string DeleteApiUrl(string source)
    {
        string fullUrl = "";
        if (!string.IsNullOrEmpty(source) && source.Contains(_configuration["ApiUrl"]))
        {
            return source.Replace(_configuration["ApiUrl"], string.Empty);
        }

        return source;
    }
}