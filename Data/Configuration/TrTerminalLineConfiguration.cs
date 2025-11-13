using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrTerminalLineConfiguration : BaseEntityConfiguration<TrTerminalLine>
    {
        protected override void ConfigureEntity(EntityTypeBuilder<TrTerminalLine> builder)
        {
            builder.ToTable("RII_TR_TerminalLine");

            builder.Property(x => x.HeaderId)
                .IsRequired();

            builder.Property(x => x.TerminalUserId)
                .IsRequired();

            

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_TrTerminalLine_HeaderId");

            builder.HasIndex(x => x.TerminalUserId)
                .HasDatabaseName("IX_TrTerminalLine_TerminalUserId");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrTerminalLine_IsDeleted");

            builder.HasOne(x => x.Header)
                .WithMany()
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.TerminalUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}