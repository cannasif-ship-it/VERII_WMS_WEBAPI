using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrLineConfiguration : BaseEntityConfiguration<TrLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<TrLine> builder)
        {
            builder.ToTable("RII_TR_LINE");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.StockCode)
                .HasMaxLength(50)
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
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasMaxLength(200);

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_TrLine_HeaderId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_TrLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_TrLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrLine_IsDeleted");

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