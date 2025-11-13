using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrRouteConfiguration : BaseEntityConfiguration<TrRoute>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<TrRoute> builder)
        {
            builder.ToTable("RII_TR_ROUTE");

            builder.Property(x => x.LineId)
                .IsRequired();

            builder.Property(x => x.StockCode)
                .HasMaxLength(35)
                .IsRequired();

            builder.Property(x => x.RouteCode)
                .HasMaxLength(30);

            builder.Property(x => x.Quantity)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.SerialNo)
                .HasMaxLength(50);

            builder.Property(x => x.SerialNo2)
                .HasMaxLength(50);

            builder.Property(x => x.SourceWarehouse);

            builder.Property(x => x.TargetWarehouse);

            builder.Property(x => x.SourceCellCode)
                .HasMaxLength(20);

            builder.Property(x => x.TargetCellCode)
                .HasMaxLength(20);

            builder.Property(x => x.Priority);

            builder.Property(x => x.Description)
                .HasMaxLength(100);

            // Indexes
            builder.HasIndex(x => x.LineId)
                .HasDatabaseName("IX_TrRoute_LineId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_TrRoute_StockCode");

            builder.HasIndex(x => x.SerialNo)
                .HasDatabaseName("IX_TrRoute_SerialNo");

            builder.HasIndex(x => x.SourceWarehouse)
                .HasDatabaseName("IX_TrRoute_SourceWarehouse");

            builder.HasIndex(x => x.TargetWarehouse)
                .HasDatabaseName("IX_TrRoute_TargetWarehouse");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrRoute_IsDeleted");

            builder.HasOne(x => x.Line)
                .WithMany(x => x.Routes)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}