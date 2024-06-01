

using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
        try
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            if (!context.Armament.Any())
            {
                var brandsData = File.ReadAllText(path + @"/Data/SeedData/armament.json");
                var brands = JsonSerializer.Deserialize<List<Armament>>(brandsData);
                foreach (var item in brands) 
                {
                    context.Armament.Add(item);
                }

                await context.SaveChangesAsync();
            }

            if (!context.Equipment.Any())
            {
                var typesData = File.ReadAllText(path + @"/Data/SeedData/equipment.json");
                var types = JsonSerializer.Deserialize<List<Equipment>>(typesData);
                foreach (var item in types)
                {
                    context.Equipment.Add(item);
                }

                await context.SaveChangesAsync();
            }
            if (!context.Clothes.Any())
            {
                var productsData = File.ReadAllText(path + @"/Data/SeedData/clothes.json");
                var products = JsonSerializer.Deserialize<List<Clothes>>(productsData);
                foreach (var item in products)
                {
                    context.Clothes.Add(item);
                }

                await context.SaveChangesAsync();
            }
            if (!context.Covers.Any())
            {
                var dmData = File.ReadAllText(path + @"/Data/SeedData/covers.json");
                var methods = JsonSerializer.Deserialize<List<Covers>>(dmData);
                foreach (var item in methods)
                {
                    context.Covers.Add(item);
                }

                await context.SaveChangesAsync();
            }
            if (!context.Boats.Any())
            {
                var dmData = File.ReadAllText(path + @"/Data/SeedData/boats.json");
                var methods = JsonSerializer.Deserialize<List<Boats>>(dmData);
                foreach (var item in methods)
                {
                    context.Boats.Add(item);
                }

                await context.SaveChangesAsync();
            }
        }
        catch (Exception e)
        {
            var logger = loggerFactory.CreateLogger(typeof(StoreContext).FullName);
                logger.LogError(e.Message);
        }
    }
}