using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class SitImportLineConfiguration : BaseEntityConfiguration<SitImportLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<SitImportLine> builder)
        {
            builder.ToTable("RII_SIT_IMPORT_LINE");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.LineId)
                .IsRequired();

            builder.Property(x => x.RouteId);

            builder.Property(x => x.StockCode)
                .HasMaxLength(35)
                .IsRequired();

            builder.Property(x => x.SerialNo)
                .HasMaxLength(50);

            builder.Property(x => x.SerialNo2)
                .HasMaxLength(50);

            builder.Property(x => x.SerialNo3)
                .HasMaxLength(50);

            builder.Property(x => x.SerialNo4)
                .HasMaxLength(50);

            builder.Property(x => x.Quantity)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.ScannedBarkod)
                .HasMaxLength(100);

            builder.Property(x => x.ErpOrderNumber)
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderNo)
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderLineNumber)
                .HasMaxLength(10);

            builder.Property(x => x.ErpOrderSequence)
                .HasMaxLength(10);

            builder.Property(x => x.Description1)
                .HasMaxLength(30);

            builder.Property(x => x.Description2)
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasMaxLength(255);

            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_SitImportLine_HeaderId");

            builder.HasIndex(x => x.LineId)
                .HasDatabaseName("IX_SitImportLine_LineId");

            builder.HasIndex(x => x.RouteId)
                .HasDatabaseName("IX_SitImportLine_RouteId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_SitImportLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_SitImportLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_SitImportLine_IsDeleted");

            builder.HasOne(x => x.Header)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Line)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Route)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}