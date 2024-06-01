// namespace Api.Helpers;
//
// public class ProductUrlResolver: IValueResolver<Product, ProductToReturnDto, List<string>>
// {
//     private readonly IConfiguration _configuration;
//
//     public ProductUrlResolver(IConfiguration configuration)
//     {
//         _configuration = configuration;
//     }
//     // }
//     public List<string> Resolve(Product source, ProductToReturnDto destination, List<string> destMember, ResolutionContext context)
//     {
//         List<string> urls = new List<string>();
//     
//         foreach (var picture in source.PictureUrl)
//         {
//             if (!string.IsNullOrEmpty(picture))
//             {
//                 string fullUrl = _configuration["ApiUrl"] + picture;
//                 if (!urls.Any(url => url.Equals(fullUrl)))
//                 {
//                     urls.Add(fullUrl);
//                 }
//             }
//         }
//         // Console.WriteLine(urls);
//         return urls;
//     }
//
// }