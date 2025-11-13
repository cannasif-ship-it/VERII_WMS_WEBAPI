using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrImportLConfiguration : BaseEntityConfiguration<GrImportL>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<GrImportL> builder)
        {
            builder.ToTable("RII_GR_ImportL");

            builder.Property(x => x.LineId)
                .HasColumnName("LineId");

            builder.Property(x => x.HeaderId)
                .IsRequired()
                .HasColumnName("HeaderId");

            builder.Property(x => x.StockCode)
                .IsRequired()
                .HasMaxLength(35)
                .HasColumnName("StockCode");

            builder.Property(x => x.Description1)
                .HasMaxLength(30)
                .HasColumnName("Description1");

            builder.Property(x => x.Description2)
                .HasMaxLength(50)
                .HasColumnName("Description2");


            // Relationships
            builder.HasOne(x => x.Line)
                .WithMany()
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Header)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            
        }
    }
}