using Api.Extensions;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Helpers;

// public class LogUserActivity : IAsyncActionFilter
// {
//     public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
//     {
//         var resultContext = await next();
//         
//         if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;
//
//         var userId = resultContext.HttpContext.User.GetUserId();
//
//         var repo = resultContext.HttpContext.RequestServices.GetService<IAdminProductsRepository>();
//         var user = await repo.
//     }
// }