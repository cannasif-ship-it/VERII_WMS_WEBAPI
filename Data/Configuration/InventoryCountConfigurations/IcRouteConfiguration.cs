using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class IcRouteConfiguration : BaseEntityConfiguration<IcRoute>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<IcRoute> builder)
        {
            builder.ToTable("RII_IC_ROUTE");

            builder.Property(x => x.ImportLineId).IsRequired();
            builder.Property(x => x.RouteCode).HasMaxLength(30);
            builder.Property(x => x.Quantity).HasColumnType("decimal(18,6)").IsRequired();
            builder.Property(x => x.SerialNo).HasMaxLength(50);
            builder.Property(x => x.SerialNo2).HasMaxLength(50);
            builder.Property(x => x.SourceWarehouse);
            builder.Property(x => x.TargetWarehouse);
            builder.Property(x => x.SourceCellCode).HasMaxLength(20);
            builder.Property(x => x.TargetCellCode).HasMaxLength(20);
            builder.Property(x => x.Priority);
            builder.Property(x => x.Description).HasMaxLength(100);

            builder.HasIndex(x => x.ImportLineId).HasDatabaseName("IX_IcRoute_ImportLineId");
            builder.HasIndex(x => x.IsDeleted).HasDatabaseName("IX_IcRoute_IsDeleted");

            builder.HasOne(x => x.ImportLine)
                .WithMany(x => x.Routes)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}