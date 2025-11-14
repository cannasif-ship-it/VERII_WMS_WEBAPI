using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class WtLineConfiguration : BaseEntityConfiguration<WtLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<WtLine> builder)
        {
            builder.ToTable("RII_WT_LINE");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.StockCode)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.OrderId);

            builder.Property(x => x.Quantity)
                .HasColumnType("decimal(18,6)")
                .IsRequired();

            builder.Property(x => x.Unit)
                .HasMaxLength(10);

            builder.Property(x => x.ErpOrderNo)
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderLineNo)
                .HasMaxLength(10);

            builder.Property(x => x.ErpLineReference)
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasMaxLength(200);

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_WtLine_HeaderId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_WtLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_WtLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_WtLine_IsDeleted");

            builder.HasOne(x => x.Header)
                .WithMany()
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);


            // Navigation properties
            builder.HasMany(x => x.Routes)
                .WithOne()
                .HasForeignKey("LineId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ImportLines)
                .WithOne(il => il.Line)
                .HasForeignKey(il => il.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.TerminalLines)
                .WithOne()
                .HasForeignKey("LineId")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}