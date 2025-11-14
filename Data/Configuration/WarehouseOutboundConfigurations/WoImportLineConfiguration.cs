using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class WoImportLineConfiguration : BaseEntityConfiguration<WoImportLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<WoImportLine> builder)
        {
            builder.ToTable("RII_WO_IMPORT_LINE");

            builder.Property(x => x.HeaderId).IsRequired();
            builder.Property(x => x.LineId).IsRequired();
            builder.Property(x => x.RouteId);
            builder.Property(x => x.StockCode).HasMaxLength(35).IsRequired();
            
            builder.Property(x => x.Description1).HasMaxLength(30);
            builder.Property(x => x.Description2).HasMaxLength(50);
            builder.Property(x => x.Description).HasMaxLength(255);

            builder.HasIndex(x => x.HeaderId).HasDatabaseName("IX_WoImportLine_HeaderId");
            builder.HasIndex(x => x.LineId).HasDatabaseName("IX_WoImportLine_LineId");
            builder.HasIndex(x => x.RouteId).HasDatabaseName("IX_WoImportLine_RouteId");
            builder.HasIndex(x => x.StockCode).HasDatabaseName("IX_WoImportLine_StockCode");
            
            builder.HasIndex(x => x.IsDeleted).HasDatabaseName("IX_WoImportLine_IsDeleted");

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