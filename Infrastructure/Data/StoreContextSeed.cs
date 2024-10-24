

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
                    await context.SaveChangesAsync();
                    Console.WriteLine(item.ProductVariants);
                    if (item.ProductVariants != null && item.ProductVariants.Count > 0)
                    {
                        Console.WriteLine(item.ProductVariants);
                        foreach (var variant in item.ProductVariants)
                        {
                            Console.WriteLine(variant);
                            variant.ProductId = item.Id;
                            if (!context.ProductVariants.Any(v => v.Size == variant.Size && v.ProductId == variant.ProductId))
                            {
                                context.ProductVariants.Add(variant);
                            }
                        }
                    }
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