using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrSBoxConfiguration : BaseEntityConfiguration<TrSBox>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<TrSBox> builder)
        {
            builder.ToTable("RII_TR_SBOX");

            builder.Property(x => x.ImportLineId)
                .IsRequired();

            builder.Property(x => x.BoxId)
                .IsRequired();

            builder.Property(x => x.SerialNumber)
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasMaxLength(200);

            // Indexes
            builder.HasIndex(x => x.ImportLineId)
                .HasDatabaseName("IX_TrSBox_ImportLineId");

            builder.HasIndex(x => x.BoxId)
                .HasDatabaseName("IX_TrSBox_BoxId");

            builder.HasIndex(x => x.SerialNumber)
                .HasDatabaseName("IX_TrSBox_SerialNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrSBox_IsDeleted");

            builder.HasOne(x => x.ImportLine)
                .WithMany()
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Box)
                .WithMany(x => x.SBoxes)
                .HasForeignKey(x => x.BoxId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}