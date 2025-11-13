using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class PtLineConfiguration : BaseEntityConfiguration<PtLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<PtLine> builder)
        {
            builder.ToTable("RII_PT_LINE");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.StockCode)
                .HasMaxLength(35)
                .IsRequired();

            builder.Property(x => x.OrderId);

            builder.Property(x => x.Quantity)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.Unit)
                .HasMaxLength(10);

            builder.Property(x => x.ErpOrderNo)
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderLineNo)
                .HasMaxLength(10);

            builder.Property(x => x.ErpLineReference)
                .HasMaxLength(10);

            builder.Property(x => x.Description)
                .HasMaxLength(100);

            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_PtLine_HeaderId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_PtLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_PtLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_PtLine_IsDeleted");

            builder.HasOne(x => x.Header)
                .WithMany(x => x.Lines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Routes)
                .WithOne(x => x.Line)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ImportLines)
                .WithOne(x => x.Line)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}