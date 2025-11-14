using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrImportSerialLineConfiguration : BaseEntityConfiguration<GrImportSerialLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<GrImportSerialLine> builder)
        {
            builder.ToTable("RII_GR_ImportSerialLine");

            builder.Property(x => x.ImportLineId)
                .IsRequired()
                .HasColumnName("ImportLineId");

            builder.Property(x => x.SerialNumber)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("SerialNumber");

            builder.Property(x => x.Quantity)
                .IsRequired()
                .HasColumnType("decimal(18,6)")
                .HasColumnName("Quantity");

            builder.Property(x => x.TargetWarehouse)
                .IsRequired()
                .HasColumnName("TargetWarehouse");

            builder.Property(x => x.TargetCellCode)
                .HasMaxLength(20)
                .HasColumnName("TargetCellCode");

            builder.Property(x => x.ScannedBarcode)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("ScannedBarcode");

            builder.Property(x => x.SerialNumber2)
                .HasMaxLength(50)
                .HasColumnName("SerialNumber2");

            builder.Property(x => x.SerialNumber3)
                .HasMaxLength(50)
                .HasColumnName("SerialNumber3");

            builder.Property(x => x.SerialNumber4)
                .HasMaxLength(50)
                .HasColumnName("SerialNumber4");

            builder.Property(x => x.Description1)
                .HasMaxLength(30)
                .HasColumnName("Description1");

            builder.Property(x => x.Description2)
                .HasMaxLength(50)
                .HasColumnName("Description2");


            // Relationships
            builder.HasOne(x => x.ImportLine)
                .WithMany(x => x.SerialLines)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrImportSerialLine_GrImportL");


            // Indexes
            builder.HasIndex(x => x.ImportLineId)
                .HasDatabaseName("IX_GrImportSerialLine_ImportLineId");

            builder.HasIndex(x => x.SerialNumber)
                .HasDatabaseName("IX_GrImportSerialLine_SerialNumber");

            builder.HasIndex(x => x.ScannedBarcode)
                .HasDatabaseName("IX_GrImportSerialLine_ScannedBarcode");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_GrImportSerialLine_IsDeleted");

            
        }
    }
}