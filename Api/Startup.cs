using Api.Controllers;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
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
            services.AddSingleton<IMongoClient>(sp =>
            {
                var settings = MongoClientSettings.FromConnectionString(_configuration["MongoDB:ConnectionString"]);
                return new MongoClient(settings);
            });

            services.AddSingleton(sp =>
            {
                var client = sp.GetRequiredService<IMongoClient>();
                var database = client.GetDatabase(_configuration["MongoDB:DatabaseName"]);
                return database;
            });
            services.AddSingleton<IMongoDbContext, MongoDbContext>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddScoped(typeof(IProductsRepository<>), typeof(ProductsRepository<>));
            services.AddScoped(typeof(IOrderRepository<>), typeof(OrderRepository<>));
           
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
            var dbContext = app.ApplicationServices.GetService<IMongoDbContext>();
            var collection = dbContext.GetCollection<BsonDocument>("Armament");
            collection.Find(FilterDefinition<BsonDocument>.Empty).FirstOrDefault();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }