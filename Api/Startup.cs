using Api.Controllers;
using Api.Helpers;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using MongoDB.Bson;
using MongoDB.Driver;

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
            services.AddControllers();
            services.AddDirectoryBrowser();
            services.AddDbContext<StoreContext>(x =>
                x.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped(typeof(IProductsRepository), typeof(ProductsRepository));
            services.AddScoped(typeof(IOrderRepository<>), typeof(OrderRepository<>));
            services.AddScoped<UrlResolver>();
            services.Configure<TelegramBotOptions>(_configuration.GetSection("TelegramBot"));
            var telegramBotOptions = new TelegramBotOptions();
            _configuration.GetSection("TelegramBot").Bind(telegramBotOptions);

            Console.WriteLine($"Telegram Bot Token: {telegramBotOptions.Token}");
            Console.WriteLine($"Telegram Channel ID: {telegramBotOptions.ChannelId}");
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