using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Extensions;

public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is InvalidOperationException invalidOperationException)
        {
            context.Result = new BadRequestObjectResult(new {error = invalidOperationException.Message});
            context.ExceptionHandled = true;
        }
    }
}