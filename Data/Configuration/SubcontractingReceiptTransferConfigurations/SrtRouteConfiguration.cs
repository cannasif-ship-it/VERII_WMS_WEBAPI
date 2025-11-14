using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class SrtRouteConfiguration : BaseEntityConfiguration<SrtRoute>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<SrtRoute> builder)
        {
            builder.ToTable("RII_SRT_ROUTE");

            builder.Property(x => x.LineId).IsRequired();
            builder.Property(x => x.StockCode).HasMaxLength(35).IsRequired();
            builder.Property(x => x.RouteCode).HasMaxLength(30);
            builder.Property(x => x.Quantity).HasColumnType("decimal(18,4)").IsRequired();
            builder.Property(x => x.SerialNo).HasMaxLength(50);
            builder.Property(x => x.SerialNo2).HasMaxLength(50);
            builder.Property(x => x.SourceCellCode).HasMaxLength(20);
            builder.Property(x => x.TargetCellCode).HasMaxLength(20);
            builder.Property(x => x.Description).HasMaxLength(100);

            builder.HasIndex(x => x.LineId).HasDatabaseName("IX_SrtRoute_LineId");
            builder.HasIndex(x => x.StockCode).HasDatabaseName("IX_SrtRoute_StockCode");
            builder.HasIndex(x => x.IsDeleted).HasDatabaseName("IX_SrtRoute_IsDeleted");

            builder.HasOne(x => x.Line)
                .WithMany(x => x.Routes)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ImportLines)
                .WithOne(x => x.Route)
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}