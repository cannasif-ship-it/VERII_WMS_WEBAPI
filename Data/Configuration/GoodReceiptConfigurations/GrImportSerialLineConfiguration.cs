using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrImportSerialLineConfiguration : BaseEntityConfiguration<GrLineSerial>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<GrLineSerial> builder)
        {
            builder.ToTable("RII_GR_LINE_SERIAL");

            builder.Property(x => x.ImportLineId)
                .IsRequired()
                .HasColumnName("ImportLineId");


            // Relationships
            builder.HasOne(x => x.ImportLine)
                .WithMany(x => x.SerialLines)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);


            // Indexes
            builder.HasIndex(x => x.ImportLineId).HasDatabaseName("IX_GrLineSerial_ImportLineId");
            builder.HasIndex(x => x.IsDeleted).HasDatabaseName("IX_GrLineSerial_IsDeleted");

            
        }
    }
}