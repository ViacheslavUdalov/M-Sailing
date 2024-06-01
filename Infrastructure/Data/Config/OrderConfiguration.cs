using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class OrderConfiguration : IEntityTypeConfiguration<CreateOrderData>
{
    public void Configure(EntityTypeBuilder<CreateOrderData> builder)
    {
        builder.Property(p => p.Id).UseIdentityColumn();
        builder.OwnsOne(o => o.Address, a =>
        {
            a.WithOwner();
        });
        builder.OwnsMany(o => o.ProductToCreateOrder, p =>
        {
            p.WithOwner();
        });
    }
}