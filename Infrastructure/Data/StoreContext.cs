using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data;

public class StoreContext : DbContext
{
    public StoreContext(DbContextOptions<StoreContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<Equipment> Equipment { get; set; }
    public DbSet<ProductVariants> ProductVariants { get; set; }
    public DbSet<Armament> Armament { get; set; }
    public DbSet<EuroValue> EuroValue { get; set; }
    public DbSet<Boats>  Boats { get; set; }
    public DbSet<CreateOrderData>  Orders { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
         builder.Entity<Equipment>()
             .HasMany(p => p.ProductVariants)
             .WithOne()
             .HasForeignKey(v => v.ProductId)
             .OnDelete(DeleteBehavior.Cascade);
         
     
        builder.Entity<CreateOrderData>()
            .Property(e => e.OrderDate)
            .HasConversion(new DateTimeOffsetToStringConverter());
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        builder.Entity<EuroValue>().HasKey(e => e.Id);
        
        if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                var dateTimeProperties = entityType.ClrType.GetProperties()
                    .Where(p => p.PropertyType == typeof(DateTimeOffset));
                foreach (var property in properties)
                {
                    builder.Entity(entityType.Name).Property(property.Name)
                        .HasConversion<double>();
                }

                foreach (var property in dateTimeProperties)
                {
                    builder.Entity(entityType.Name).Property(property.Name)
                        .HasConversion(new DateTimeOffsetToBinaryConverter());
                }
            }
        }
    }
} 