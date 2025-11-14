using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class PtImportLineConfiguration : BaseEntityConfiguration<PtImportLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<PtImportLine> builder)
        {
            builder.ToTable("RII_PT_IMPORT_LINE");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.LineId)
                .IsRequired();

            builder.Property(x => x.RouteId);

            builder.Property(x => x.StockCode)
                .HasMaxLength(35)
                .IsRequired();

            

            builder.Property(x => x.Description1)
                .HasMaxLength(30);

            builder.Property(x => x.Description2)
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasMaxLength(255);

            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_PtImportLine_HeaderId");

            builder.HasIndex(x => x.LineId)
                .HasDatabaseName("IX_PtImportLine_LineId");

            builder.HasIndex(x => x.RouteId)
                .HasDatabaseName("IX_PtImportLine_RouteId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_PtImportLine_StockCode");

            

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_PtImportLine_IsDeleted");

            builder.HasOne(x => x.Header)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Line)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Route)
                .WithMany()
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}