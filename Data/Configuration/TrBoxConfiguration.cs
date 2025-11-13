using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrBoxConfiguration : BaseEntityConfiguration<TrBox>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<TrBox> builder)
        {
            builder.ToTable("RII_TR_BOX");

            builder.Property(x => x.ImportLineId)
                .IsRequired();

            builder.Property(x => x.BoxType)
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(x => x.Quantity)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.Weight)
                .HasColumnType("decimal(18,4)");

            builder.Property(x => x.Volume)
                .HasColumnType("decimal(18,4)");

            builder.Property(x => x.Description1)
                .HasMaxLength(100);

            builder.Property(x => x.Description2)
                .HasMaxLength(100);

            builder.Property(x => x.Description)
                .HasMaxLength(200);

            // Indexes
            builder.HasIndex(x => x.ImportLineId)
                .HasDatabaseName("IX_TrBox_ImportLineId");

            builder.HasIndex(x => x.BoxNo)
                .HasDatabaseName("IX_TrBox_BoxNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrBox_IsDeleted");

            builder.HasOne(x => x.ImportLine)
                .WithMany(x => x.Boxes)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.SBoxes)
                .WithOne(x => x.Box)
                .HasForeignKey(x => x.BoxId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}