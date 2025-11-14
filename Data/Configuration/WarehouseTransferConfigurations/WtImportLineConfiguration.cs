using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class WtImportLineConfiguration : BaseEntityConfiguration<WtImportLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<WtImportLine> builder)
        {
            builder.ToTable("RII_WT_IMPORT_LINE");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.LineId)
                .IsRequired();

            // DB'de mevcut olan ek FK sütunu için eşleme
            builder.Property(x => x.LineId1);

            builder.Property(x => x.RouteId);

            builder.Property(x => x.StockCode)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.SerialNo)
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderNo)
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderNumber)
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasMaxLength(200);

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_TrImportLine_HeaderId");

            builder.HasIndex(x => x.LineId)
                .HasDatabaseName("IX_TrImportLine_LineId");

            builder.HasIndex(x => x.RouteId)
                .HasDatabaseName("IX_TrImportLine_RouteId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_TrImportLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_TrImportLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrImportLine_IsDeleted");

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

            builder.HasMany(x => x.Boxes)
                .WithOne(x => x.ImportLine)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}