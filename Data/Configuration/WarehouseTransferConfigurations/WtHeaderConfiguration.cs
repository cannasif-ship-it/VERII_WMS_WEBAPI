using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class WtHeaderConfiguration : BaseHeaderEntityConfiguration<WtHeader>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<WtHeader> builder)
        {
            builder.ToTable("RII_WT_HEADER");

            builder.Property(x => x.BranchCode)
                .HasColumnName("BranchCode")
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(x => x.CustomerCode)
                .HasColumnName("CustomerCode")
                .HasMaxLength(20);

            builder.Property(x => x.SourceWarehouse)
                .HasColumnName("SourceWarehouse")
                .HasMaxLength(20);

            builder.Property(x => x.TargetWarehouse)
                .HasColumnName("TargetWarehouse")
                .HasMaxLength(20);

            builder.Property(x => x.Type)
                .HasColumnName("Type")
                .HasMaxLength(20);

            // Indexes
            builder.HasIndex(x => x.DocumentNo)
                .HasDatabaseName("IX_TrHeader_DocumentNo")
                .IsUnique();

            builder.HasIndex(x => x.BranchCode)
                .HasDatabaseName("IX_TrHeader_BranchCode");

            builder.HasIndex(x => x.ProjectCode)
                .HasDatabaseName("IX_TrHeader_ProjectCode");

            builder.HasIndex(x => x.DocumentDate)
                .HasDatabaseName("IX_TrHeader_DocumentDate");

            builder.HasIndex(x => x.CustomerCode)
                .HasDatabaseName("IX_TrHeader_CustomerCode");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrHeader_IsDeleted");

            builder.HasIndex(x => x.YearCode)
                .HasDatabaseName("IX_TrHeader_YearCode");

            // Navigation properties
            builder.HasMany(x => x.Lines)
                .WithOne(x => x.Header)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ImportLines)
                .WithOne(x => x.Header)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            
        }
    }
}