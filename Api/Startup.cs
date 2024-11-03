using Api.Controllers;
using Api.Extensions;
using Api.Helpers;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

namespace Api;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(
                options =>
            {
                options.Filters.Add<ExceptionFilter>();
            }
                );
            services.AddDirectoryBrowser();
          
            
            services.AddDbContext<StoreContext>(x =>
                x.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<AppIdentityDbContext>(x =>
            {
                x.UseNpgsql(_configuration.GetConnectionString("IdentityConnection"));
            });
            
            services.AddIdentityService(_configuration);
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAdminProductsRepository, AdminProductsRepository>();
            services.AddScoped<IEuroValueRepository, EuroValueRepository>();
            // services.AddScoped<LogUserActivity>();
            services.AddScoped(typeof(IProductsRepository), typeof(ProductsRepository));
            services.AddScoped(typeof(IOrderRepository<>), typeof(OrderRepository<>));
            services.AddScoped<UrlResolver>();
            services.AddScoped<PasswordValidator<AppUser>>();
            
            
            services.Configure<TelegramBotOptions>(_configuration.GetSection("TelegramBot"));
            var telegramBotOptions = new TelegramBotOptions();
            _configuration.GetSection("TelegramBot").Bind(telegramBotOptions);

            services.AddHttpClient<ITelegramService, TelegramService>((services, client) =>
            {
                var botToken = _configuration["TelegramBot:Token"];
                var channelId = _configuration["TelegramBot:ChannelId"];
                return new TelegramService(services, botToken, channelId);
            });
            
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                );
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            
           
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Content")
                    ), RequestPath = "/content"
            });
            app.UseCors("CorsPolicy");
           
          
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }