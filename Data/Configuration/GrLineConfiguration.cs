using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrLineConfiguration : BaseEntityConfiguration<GrLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<GrLine> builder)
        {
            builder.ToTable("RII_GR_Line");

            builder.Property(x => x.HeaderId)
                .IsRequired()
                .HasColumnName("HeaderId");

            builder.Property(x => x.Quantity)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasColumnName("Quantity");

            builder.Property(x => x.ErpProductCode)
                .IsRequired()
                .HasMaxLength(35)
                .HasColumnName("ErpProductCode");

            builder.Property(x => x.MeasurementUnit)
                .HasColumnName("MeasurementUnit");

            builder.Property(x => x.Description1)
                .HasMaxLength(30)
                .HasColumnName("Description1");

            builder.Property(x => x.Description2)
                .HasMaxLength(50)
                .HasColumnName("Description2");

            builder.Property(x => x.Description3)
                .HasMaxLength(100)
                .HasColumnName("Description3");


            // Relationships
            builder.HasOne(x => x.Header)
                .WithMany(x => x.Lines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrLine_GrHeader");

            

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_GrLine_HeaderId");

            builder.HasIndex(x => x.ErpProductCode)
                .HasDatabaseName("IX_GrLine_ErpProductCode");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_GrLine_IsDeleted");

            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_GrLine_HeaderId");

            
        }
    }
}